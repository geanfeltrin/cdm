'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')

class PostController {
  async index ({ auth }) {
    const user = await auth.getUser()
    if (user.can('read_private_post')) {
      const post = await Post.query()
        .with('users')
        .with('subcategories')
        .with('file')
        .fetch()

      return post
    }
  }

  async store ({ request, auth }) {
    const data = request.only([
      'title',
      'description',
      'url',
      'sub_category_id',
      'file_id'
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
      'file_id'
    ])

    const post = await Post.findOrFail(params.id)

    post.merge(data)

    await post.save()

    await post.loadMany(['file', 'subcategories'])

    return post
  }

  async destroy ({ params }) {
    const post = await Post.findOrFail(params.id)

    await post.delete()
  }
}

module.exports = PostController
