'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DropboxDownloadSchema extends Schema {
  up () {
    this.create('dropbox_downloads', table => {
      table.increments()
      table.string('path')
      table.string('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('dropbox_downloads')
  }
}

module.exports = DropboxDownloadSchema
