'use strict'

const Schema = use('Schema')

class SubCategorySchema extends Schema {
  up () {
    this.create('sub_categories', table => {
      table.increments()
      table
        .integer('category_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('categories')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table
        .string('slug')
        .notNullable()
        .unique()
      table
        .string('name')
        .notNullable()
        .unique()
      table.string('description').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sub_categories')
  }
}

module.exports = SubCategorySchema
