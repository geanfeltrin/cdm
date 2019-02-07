'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  static boot () {
    super.boot()

    this.addTrait('@provider:Lucid/Slugify', {
      fields: {
        slug: 'name'
      },
      strategy: 'dbIncrement',
      disableUpdates: false
    })
  }

  subCategories () {
    return this.hasMany('App/Models/SubCategory')
  }
  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = Category
