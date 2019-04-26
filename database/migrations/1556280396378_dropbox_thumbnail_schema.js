'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropboxThumbnailSchema extends Schema {
  up () {
    this.create('dropbox_thumbnails', table => {
      table.increments()
      table.string('path')
      table.string('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('dropbox_thumbnails')
  }
}

module.exports = DropboxThumbnailSchema
