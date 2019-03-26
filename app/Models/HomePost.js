"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class HomePost extends Model {
  file() {
    return this.belongsTo("App/Models/File");
  }
  users() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = HomePost;
