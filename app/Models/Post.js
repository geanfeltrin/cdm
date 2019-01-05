'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {
  categories () {
    return this.belongsTo('App/Models/Category')
  }
  file () {
    return this.belongsTo('App/Models/File')
  }
  user () {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post
