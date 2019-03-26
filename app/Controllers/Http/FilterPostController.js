"use strict";
const Post = use("App/Models/Post");

class FilterPostController {
  async index() {
    const post = await Post.query()
      .orderBy("id", "desc")
      .where("featured", "=", "true")
      .with("file")
      .fetch();

    return post;
  }
  async show({ params }) {
    // const post = Post.findOrFail("sub_category_id", params.id);

    const post = await Post.query()
      .where("sub_category_id", "=", params.id)
      .with("subcategories")
      .with("file")
      .orderBy("id", "desc")
      .fetch();
    return post;
  }

  async update({ params }) {}
}

module.exports = FilterPostController;
