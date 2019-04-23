'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LinkdownloaddropboxSchema extends Schema {
  up () {
    this.create('linkdownloaddropboxes', table => {
      table.increments()
      table.string('path')
      table.string('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('linkdownloaddropboxes')
  }
}

module.exports = LinkdownloaddropboxSchema
