'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index () {
    const category = await Category.query()
      .with('subcategories')
      .fetch()

    return category
  }

  async store ({ request }) {
    const { subcategories, ...data } = request.only([
      'name',
      'slug',
      'description',
      'subcategories'
    ])

    const category = await Category.create(data)

    return category
  }

  async show ({ params, request, response, view }) {}

  /**
   * Render a form to update an existing category.
   * GET categories/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {}

  /**
   * Update category details.
   * PUT or PATCH categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {}

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {}
}

module.exports = CategoryController
