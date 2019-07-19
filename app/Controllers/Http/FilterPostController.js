/* eslint-disable no-useless-return */
'use strict'
const Post = use('App/Models/Post')

class FilterPostController {
  async index ({ auth }) {
    const user = await auth.getUser()
    const roles = await user.getRoles()

    if (roles[0] === 'polob') {
      const post = await Post.query()
        .where({ type: 'public' })
        .orWhere({ type: 'exclusiveB' })
        .orderBy('id', 'desc')
        .where('featured', '=', 'true')
        .with('file')
        .with('dropboxDownload')
        .with('dropboxThumbnail')
        .fetch()

      return post
    }

    if (roles[0] === 'polo') {
      const post = await Post.query()
        .where({ type: 'public' })
        .orWhere({ type: 'exclusiveA' })
        .where('featured', '=', 'true')
        .with('subcategories')
        .with('file')
        .with('dropboxDownload')
        .with('dropboxThumbnail')
        .orderBy('id', 'desc')
        .fetch()

      return post
    }
    const post = await Post.query()
      .orderBy('id', 'desc')
      .where('featured', '=', 'true')
      .with('file')
      .with('dropboxDownload')
      .with('dropboxThumbnail')
      .fetch()

    return post
  }
  // async filter ({ params, request }) {
  //   const title = request.input('title')
  //   const id = request.input('id')
  //   const query = Post.query()

  //   if (title) {
  //     query.where('title', 'ILIKE', `%${title}%`)
  //   }
  //   if (id) {
  //     query.where('sub_category_id', '=', id)
  //   }

  //   const post = await query
  //     .with('subcategories')
  //     .with('file')
  //     .with('dropboxDownload')
  //     .with('dropboxThumbnail')
  //     .orderBy('id', 'desc')
  //     .fetch()

  //   return post
  // }

  async show ({ params, auth }) {
    const user = await auth.getUser()
    const roles = await user.getRoles()
    console.log(roles)
    if (params.id) {
      if (roles[0] === 'polob') {
        const post = await Post.query()
          .where('sub_category_id', '=', params.id)
          .andWhere({ type: 'public' })
          .orWhere({ type: 'exclusiveB' })
          .with('subcategories')
          .with('file')
          .with('dropboxDownload')
          .with('dropboxThumbnail')
          .orderBy('id', 'desc')
          .fetch()

        return post
      }
      if (roles[0] === 'polo') {
        const post = await Post.query()
          .where('sub_category_id', '=', params.id)
          .andWhere({ type: 'public' })
          .orWhere({ type: 'exclusiveA' })
          .with('subcategories')
          .with('file')
          .with('dropboxDownload')
          .with('dropboxThumbnail')
          .orderBy('id', 'desc')
          .fetch()

        return post
      }
      const post = await Post.query()
        .where('sub_category_id', '=', params.id)
        .with('subcategories')
        .with('file')
        .with('dropboxDownload')
        .with('dropboxThumbnail')
        .orderBy('id', 'desc')
        .fetch()
      return post
    } else return
  }

  async update ({ params }) {}
}

module.exports = FilterPostController
