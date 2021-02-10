import { model, Schema, Model, Document, Mongoose } from "mongoose";

interface IPost extends Document {
  type: String;
  creator: Number;
  like: Number;
  dislike: Number;
  tags: [String];
  visibility: String;
  caption: String;
}

const PostSchema: Schema = new Schema({
  type: { type: String, requiered: true },
  creator: { type: Number, required: true },
  like: { type: Number, required: false },
  dislike: { type: Number, required: false },
  tags: { type: [String], required: false },
  visibility: { type: String, required: true },
  caption: { type: String, required: false },
});

const Post: Model<IPost> = model<IPost>("posts", PostSchema);

export { Post };
