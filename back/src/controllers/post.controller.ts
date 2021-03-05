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
    return await Post.aggregate(
      [
        {
          $match: { creator: { $regex: creator, $options: "i" } },
        },
      ],
      function (err: any, result: any) {
        if (err) {
          return err;
        } else {
          return result;
        }
      }
    );
  }

  async getByTag(tag: String) {
    return await Post.aggregate(
      [
        {
          $match: { tags: { $regex: tag, $options: "i" } },
        },
      ],
      function (err: any, result: any) {
        if (err) {
          return err;
        } else {
          return result;
        }
      }
    );
  }

  async updateOne(id: String, update: Object) {
    return Post.findByIdAndUpdate(id, update, {
      new: true,
      useFindAndModify: false,
    });
  }
}
