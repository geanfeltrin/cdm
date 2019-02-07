'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AlterPostSchema extends Schema {
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
    this.table('posts', table => {
      //
    })
  }
}

module.exports = AlterPostSchema
