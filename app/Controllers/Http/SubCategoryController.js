'use strict'

const SubCategory = use('App/Models/SubCategory')

class SubCategoryController {
  async index () {
    const subCategory = await SubCategory.all()

    return subCategory
  }

  async store ({ request }) {
    const data = request.only(['name', 'slug', 'description'])

    const subCategory = await SubCategory.create(data)

    return subCategory
  }

  async update ({ params, request }) {
    const data = request.only(['name', 'slug', 'description'])
    const subCategory = await SubCategory.findOrFail(params.id)

    subCategory.merge(data)

    await subCategory.save()

    return subCategory
  }

  async destroy ({ params, request, response }) {
    const subCategory = await SubCategory.findOrFail(params.id)

    await subCategory.delete()
  }
}

module.exports = SubCategoryController
