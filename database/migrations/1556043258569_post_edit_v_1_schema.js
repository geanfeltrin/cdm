'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostEditV1Schema extends Schema {
  up () {
    this.table('posts', table => {
      // alter table
      table
        .integer('linkdbxdownload_id')
        .unsigned()
        .references('id')
        .inTable('linkdownloaddropboxes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('linkdbxthumb_id')
        .unsigned()
        .references('id')
        .inTable('linkthumbdropboxes')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  down () {
    this.table('post_edit_v_1_s', table => {
      // reverse alternations
    })
  }
}

module.exports = PostEditV1Schema
