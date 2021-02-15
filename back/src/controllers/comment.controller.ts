import { Comment } from "../models/comment.model";

export default class CommentController {
  async saveComment(comment: any) {
    return await comment.save();
  }

  async getById(id: String) {
    return await Comment.findById({ _id: id });
  }

  async deleteById(id: String) {
    return await Comment.findByIdAndDelete({ _id: id });
  }
}
