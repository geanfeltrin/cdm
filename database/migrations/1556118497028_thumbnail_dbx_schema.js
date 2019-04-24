'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ThumbnailDbxSchema extends Schema {
  up () {
    this.create('thumbnail_dbxes', table => {
      table.increments()
      table.string('path')
      table.string('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('thumbnail_dbxes')
  }
}

module.exports = ThumbnailDbxSchema
