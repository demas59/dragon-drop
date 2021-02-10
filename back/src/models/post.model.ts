import { model, Schema, Model, Document, Mongoose } from "mongoose";

interface IPost extends Document {
  format: String;
  creator: String;
  likes: [
    {
      userName: String;
      value: Number;
    }
  ];
  tags: [String];
  visibility: String;
  caption: String;
  comments: [
    {
      writer: String;
      value: String;
      creation: Date;
    }
  ];
}

const PostSchema: Schema = new Schema({
  format: { type: String, requiered: true },
  creator: { type: String, required: true },
  likes: { type: [Object], required: false },
  tags: { type: [String], required: false },
  visibility: { type: String, required: true },
  caption: { type: String, required: false },
  comments: { type: [Object], required: false },
});

const Post: Model<IPost> = model<IPost>("posts", PostSchema);

export { Post };
