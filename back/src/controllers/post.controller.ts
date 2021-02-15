import { Post } from "../models/post.model";

export default class PostController {
  async getAll() {
    return await Post.find({});
  }

  async getById(id: String) {
    return await Post.findById({ _id: id });
  }

  async updateOne(id: String, update: Object) {
    return Post.findByIdAndUpdate(id, update, {
      new: true,
      useFindAndModify: false,
    });
  }

  async addComment(comment: Comment) {}
}
