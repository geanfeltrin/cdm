'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileEditSchema extends Schema {
  up () {
    this.table('files', table => {
      // alter table
      table.string('urldropbox')
    })
  }

  down () {
    this.table('file_edits', table => {
      // reverse alternations
    })
  }
}

module.exports = FileEditSchema
