'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Category extends Model {
  subCategory () {
    return this.hasMany('App/Models/SubCategory')
  }
  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = Category
