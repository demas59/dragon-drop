import { Post } from "../models/post.model";

export default class PostController {
  async getAll() {
    return await Post.find({});
  }

  async getById(id: String) {
    return await Post.findById({ _id: id });
  }

  async getByTag(tag: String) {
    return await Post.find({ tags: "chien" }, function (err, result) {
      if (err) {
        return err;
      } else {
        return result;
      }
    });
  }

  async updateOne(id: String, update: Object) {
    return Post.findByIdAndUpdate(id, update, {
      new: true,
      useFindAndModify: false,
    });
  }
}
