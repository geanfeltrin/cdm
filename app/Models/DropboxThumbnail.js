'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DropboxThumbnail extends Model {
  static get table () {
    return 'dropbox_thumbnails'
  }
  post () {
    return this.belongsTo('App/Models/post')
  }
}

module.exports = DropboxThumbnail
