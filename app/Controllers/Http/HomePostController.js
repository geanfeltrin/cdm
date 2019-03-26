"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Home = use("App/Models/HomePost");

const File = use("App/Models/File");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
/**
 * Resourceful controller for interacting with homeposts
 */
class HomePostController {
  /**
   * Show a list of all homeposts.
   * GET homeposts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const user = await auth.getUser();
    if (user.is("administrator || moderator")) {
      const home = await Home.query()
        .orderBy("id", "desc")
        .with("file")
        .fetch();

      return home;
    }
    const home = await Home.query()
      .where({ type: "public" })
      .fetch();

    return home;
  }

  /**
   * Create/save a new homepost.
   * POST homeposts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(["title", "url", "file_id", "type"]);

    const home = await Home.create({ ...data, user_id: auth.user.id });

    await home.loadMany(["file"]);

    return home;
  }

  /**
   * Display a single homepost.
   * GET homeposts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const home = Home.findOrFail(params.id);

    return home;
  }

  /**
   * Update homepost details.
   * PUT or PATCH homeposts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const data = request.only(["title", "url", "file_id", "type"]);

    const home = await Home.findOrFail(params.id);

    home.merge(data);

    await home.save();

    await home.loadMany(["file"]);

    return home;
  }

  /**
   * Delete a homepost with id.
   * DELETE homeposts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const home = await Home.findOrFail(params.id);

    if (home.file_id) {
      const file = await File.findOrFail(home.file_id);
      try {
        promisify(fs.unlink)(
          path.resolve(__dirname, "..", "..", "..", "tmp", "uploads", file.file)
        );
        await file.delete();
        await home.delete();
      } catch (error) {
        return response
          .status(error.status)
          .send({ error: { message: "Erro ao delatar o arquivo" } });
      }
    }
    await home.delete();
  }
}

module.exports = HomePostController;
