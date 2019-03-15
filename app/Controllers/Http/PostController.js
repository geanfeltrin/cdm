'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')
const File = use('App/Models/File')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

class PostController {
  async index ({ auth }) {
    const user = await auth.getUser()
    if (user.is('administrator || moderator')) {
      const post = await Post.query()
        .orderBy('id', 'desc')
        .with('subcategories')
        .with('file')
        .fetch()

      return post
    }
    const post = await Post.query()
      .where({ type: 'public' })    
      .with('subcategories')
      .fetch()

    return post
  }

  async store ({ request, auth }) {
    const data = request.only([
      'title',
      'description',
      'url',
      'sub_category_id',
      'file_id',
      'imagem',
      'type'
    ])

    const post = await Post.create({ ...data, user_id: auth.user.id })

    await post.loadMany(['file', 'subcategories'])

    return post
  }

  async show ({ params, request, response, view }) {
    const post = Post.findOrFail(params.id)

    return post
  }

  async update ({ params, request }) {
    const data = request.only([
      'title',
      'description',
      'url',
      'sub_category_id',
      'file_id',
      'imagem',
      'type'
    ])

    const post = await Post.findOrFail(params.id)

    post.merge(data)

    await post.save()

    await post.loadMany(['file', 'subcategories'])

    return post
  }

  async destroy ({ params, response }) {
    const post = await Post.findOrFail(params.id)

    console.log(post.file_id)
    if (post.file_id) {
      const file = await File.findOrFail(post.file_id)
      console.log('sadas', file.file)
      try {
        promisify(fs.unlink)(
          path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads', file.file)
        )
        await file.delete()
        await post.delete()
      } catch (error) {
        return response
          .status(error.status)
          .send({ error: { message: 'Erro ao delatar o arquivo' } })
      }
    }
    await post.delete()
  }
}

module.exports = PostController
