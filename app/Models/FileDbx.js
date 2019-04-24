'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FileDbx extends Model {
  static get table () {
    return 'file_dbxes'
  }
  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = FileDbx
