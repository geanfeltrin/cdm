'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostEditFileSchema extends Schema {
  up () {
    this.table('posts', table => {
      // alter table
      table
        .integer('filedbx_id')
        .unsigned()
        .references('id')
        .inTable('file_dbxes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('thumbnaildbx_id')
        .unsigned()
        .references('id')
        .inTable('thumbnail_dbxes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('post_edit_files', table => {
      // reverse alternations
    })
  }
}

module.exports = PostEditFileSchema
