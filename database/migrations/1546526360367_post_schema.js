'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .integer('sub_category_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('sub_categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')

      table.string('title').notNullable()
      table.string('description').notNullable()
      table.string('url').notNullable()
      table.string('imagem')
      table.string('type').defaultTo('public')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
  }
}

module.exports = PostSchema
