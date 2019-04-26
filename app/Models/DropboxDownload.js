'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DropboxDownload extends Model {
  static get table () {
    return 'dropbox_downloads'
  }
  post () {
    return this.belongsTo('App/Models/post')
  }
}

module.exports = DropboxDownload
