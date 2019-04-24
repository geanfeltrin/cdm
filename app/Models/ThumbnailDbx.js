'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ThumbnailDbx extends Model {
  static get table () {
    return 'thumbnail_dbxes'
  }
  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = ThumbnailDbx
