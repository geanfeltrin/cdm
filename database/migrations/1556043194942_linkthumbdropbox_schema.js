'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LinkthumbdropboxSchema extends Schema {
  up () {
    this.create('linkthumbdropboxes', table => {
      table.increments()
      table.string('path')
      table.string('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('linkthumbdropboxes')
  }
}

module.exports = LinkthumbdropboxSchema
