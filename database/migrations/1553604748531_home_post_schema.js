"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class HomePostSchema extends Schema {
  up() {
    this.create("home_posts", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table
        .integer("file_id")
        .unsigned()
        .references("id")
        .inTable("files")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");

      table.string("title").notNullable();
      table.string("url").notNullable();
      table.string("type").defaultTo("public");
      table.timestamps();
    });
  }

  down() {
    this.drop("home_posts");
  }
}

module.exports = HomePostSchema;
