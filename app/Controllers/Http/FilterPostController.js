/* eslint-disable no-useless-return */
'use strict'
const Post = use('App/Models/Post')

class FilterPostController {
  async index () {
    const post = await Post.query()
      .orderBy('id', 'desc')
      .where('featured', '=', 'true')
      .with('file')
      .with('dropboxDownload')
      .with('dropboxThumbnail')
      .fetch()

    return post
  }
  async filter ({ params, request }) {
    const title = request.input('title')
    const id = request.input('id')
    const query = Post.query()

    if (title) {
      query.where('title', 'ILIKE', `%${title}%`)
    }
    if (id) {
      query.where('sub_category_id', '=', id)
    }

    const post = await query
      .with('subcategories')
      .with('file')
      .with('dropboxDownload')
      .with('dropboxThumbnail')
      .orderBy('id', 'desc')
      .fetch()

    return post
  }

  async update ({ params }) {}
}

module.exports = FilterPostController
