'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostEditV2Schema extends Schema {
  up () {
    this.table('posts', table => {
      // alter table
      table
        .string('url')
        .nullable()
        .alter()
      table.dropColumn('imagem')
    })
  }

  down () {
    this.table('posts', table => {
      // reverse alternations
    })
  }
}

module.exports = PostEditV2Schema
