import { model, Schema, Model, Document, Mongoose } from "mongoose";

interface IComment extends Document {
  userName: String;
  value: String;
  creation: Date;
}

const CommentSchema: Schema = new Schema({
  userName: { type: String, requiered: true },
  value: { type: String, required: true },
  creation: { type: Date, required: true },
});

const Comment: Model<IComment> = model<IComment>("comments", CommentSchema);

export { Comment };
