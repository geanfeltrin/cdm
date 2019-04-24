'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileDbxSchema extends Schema {
  up () {
    this.create('file_dbxes', table => {
      table.increments()
      table.string('path')
      table.string('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('file_dbxes')
  }
}

module.exports = FileDbxSchema
