import { model, Schema, Model, Document, Mongoose } from "mongoose";

interface IUser extends Document {
  role: String;
  login: String;
  password: String;
  friends: [String];
  favourite: [String];
}

const UserSchema: Schema = new Schema({
  role: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [String],
  favourite:[String]
});

const User: Model<IUser> = model<IUser>("users", UserSchema);

export { User };
