"use strict";
const Post = use("App/Models/Post");

class FilterPostController {
  async show({ params }) {
    // const post = Post.findOrFail("sub_category_id", params.id);

    const post = await Post.query()
      .where("sub_category_id", "=", params.id)
      .with("subcategories")
      .with("file")
      .fetch();

    return post;
  }
}

module.exports = FilterPostController;
