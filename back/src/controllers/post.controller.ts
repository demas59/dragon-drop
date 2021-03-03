import { Post } from "../models/post.model";

export default class PostController {
  async deleteById(id: String) {
    return await Post.findByIdAndDelete({ _id: id });
  }

  async getAll() {
    return await Post.find({});
  }

  async getById(id: String) {
    return await Post.findById({ _id: id });
  }

  async getByCreator(creator: String) {
    return await Post.find({ creator: creator }, function (err, result) {
      if (err) {
        return err;
      } else {
        return result;
      }
    });
  }

  async getByTag(tag: String) {
    return await Post.find({ tags: tag }, function (err, result) {
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
