'use strict'

const Category = use('App/Models/Category')

class CategoryController {
  async index () {
    const category = await Category.query()
      .with('subCategories')
      .fetch()

    return category
  }

  async store ({ request }) {
    const data = request.only(['name', 'slug', 'description'])

    const category = await Category.create(data)

    return category
  }

  async show ({ params }) {
    const category = await Category.findOrFail(params.id)

    await category.load('subCategories')

    return category
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'slug', 'description'])

    const category = await Category.findOrFail(params.id)

    category.merge(data)

    await category.save()

    return category
  }

  /**
   * Delete a category with id.
   * DELETE categories/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const category = await Category.findOrFail(params.id)

    await category.delete()
  }
}

module.exports = CategoryController
