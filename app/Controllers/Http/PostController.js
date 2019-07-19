'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')
const File = use('App/Models/File')
const dropboxThumbnail = use('App/Models/DropboxThumbnail')
const dropboxDownload = use('App/Models/DropboxDownload')
const dbx = require('../../Service/dropBox')
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

class PostController {
  async index ({ auth, request }) {
    const user = await auth.getUser()
    let pagination = request.only(['page', 'limit'])
    const page = parseInt(pagination.page, 10) || 16
    const limit = parseInt(pagination.limit, 20) || 10

    if (user.is('administrator || moderator')) {
      const post = await Post.query()
        .orderBy('id', 'desc')
        .with('subcategories')
        .with('file')
        .with('dropboxDownload')
        .with('dropboxThumbnail')
        .paginate(page, limit)

      return post
    }
    const post = await Post.query()
      .where({ type: 'public' })
      .with('subcategories')
      .with('dropboxDownload')
      .with('dropboxThumbnail')
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
      'type',
      'featured',
      'download_id',
      'thumbnail_id'
    ])
    console.dir(data)
    const post = await Post.create({ ...data, user_id: auth.user.id })

    await post.loadMany([
      'file',
      'subcategories',
      'dropboxDownload',
      'dropboxThumbnail'
    ])

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
      'type',
      'featured',
      'download_id',
      'thumbnail_id'
    ])
    const post = await Post.findOrFail(params.id)

    // if (data.featured === true) {
    //   await Post.query()
    //     .where('featured', '=', 'true')
    //     .update({ featured: false })
    // }

    post.merge(data)

    await post.save()

    await post.loadMany([
      'file',
      'subcategories',
      'dropboxDownload',
      'dropboxThumbnail'
    ])

    return post
  }

  async destroy ({ params, response }) {
    const post = await Post.findOrFail(params.id)

    if (post.file_id) {
      const file = await File.findOrFail(post.file_id)
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
    if (post.download_id) {
      try {
        const file = await dropboxDownload.findOrFail(post.download_id)

        await dbx.filesDelete({ path: file.path })

        await file.delete()
      } catch (error) {
        return response
          .status(error.status)
          .send({ error: { message: 'Erro ao delatar o arquivo no Dropbox' } })
      }
    }

    if (post.thumbnail_id) {
      try {
        const file = await dropboxThumbnail.findOrFail(post.thumbnail_id)

        await dbx.filesDelete({ path: file.path })

        await file.delete()
      } catch (error) {
        return response
          .status(error.status)
          .send({ error: { message: 'Erro ao delatar o arquivo no Dropbox' } })
      }
    }
    await post.delete()
  }
}

module.exports = PostController
