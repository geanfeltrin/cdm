'use strict'

const SubCategory = use('App/Models/SubCategory')

class SubCategoryController {
  async index () {
    const subCategory = await SubCategory.query()
      .with('categories')
      .fetch()

    return subCategory
  }

  async store ({ request }) {
    const { categories, ...data } = request.only([
      'name',
      'category_id',
      'slug',
      'description'
    ])

    const subCategory = await SubCategory.create(data)

    await subCategory.load('categories')

    return subCategory
  }

  async show ({ params }) {
    const subCategory = SubCategory.findOrFail(params.id)

    return subCategory
  }

  async update ({ params, request }) {
    const { categories, ...data } = request.only([
      'name',
      'category_id',
      'slug',
      'description'
    ])

    const subCategory = await SubCategory.findOrFail(params.id)

    subCategory.merge(data)

    await subCategory.save()

    await subCategory.load('categories')

    return subCategory
  }

  async destroy ({ params }) {
    const subCategory = await SubCategory.findOrFail(params.id)

    await subCategory.delete()
  }
}

module.exports = SubCategoryController
