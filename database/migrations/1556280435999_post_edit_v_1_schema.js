'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostEditV1Schema extends Schema {
  up () {
    this.table('posts', table => {
      // alter table
      table.integer('download_id').unsigned()
      table.integer('thumbnail_id').unsigned()

      table
        .foreign('download_id')
        .references('id')
        .inTable('dropbox_downloads')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .foreign('thumbnail_id')
        .references('id')
        .inTable('dropbox_thumbnails')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
  }

  down () {
    this.table('posts', table => {
      // reverse alternations
      table.dropForeign('download_id')
      table.dropForeign('thumbnail_id')
    })
  }
}

module.exports = PostEditV1Schema
