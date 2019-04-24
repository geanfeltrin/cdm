'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FileDbx extends Model {
  posts () {
    return this.hasMany('App/Models/Post')
  }
}

module.exports = FileDbx
