"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostEditSchema extends Schema {
  up() {
    this.table("posts", table => {
      table.boolean("featured").defaultTo("false");
    });
  }

  down() {
    this.table("post_edits", table => {
      // reverse alternations
    });
  }
}

module.exports = PostEditSchema;
