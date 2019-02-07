'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdonisSchema extends Schema {
  up () {
    this.table('posts', table => {
      table.string('url-img').notNullable()
      table
        .boolean('private')
        .notNullable()
        .defaultTo(true)
    })
  }

  down () {
    this.table('adonis', table => {
      // reverse alternations
    })
  }
}

module.exports = AdonisSchema
