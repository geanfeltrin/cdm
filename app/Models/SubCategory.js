'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class SubCategory extends Model {
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
  categories () {
    return this.belongsTo('App/Models/Category')
  }
}

module.exports = SubCategory
