'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  subcategories () {
    return this.belongsTo('App/Models/SubCategory')
  }
  file () {
    return this.belongsTo('App/Models/File')
  }
  users () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post