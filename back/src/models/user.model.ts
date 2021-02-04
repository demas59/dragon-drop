import { model, Schema, Model, Document, Mongoose } from "mongoose";

interface IUser extends Document {
  firstname: String;
  lastname: String;
  role: String;
  login: String;
  password: String;
  friends: [Number];
}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  role: { type: String, required: true },
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  friends: [Number],
});

const User: Model<IUser> = model<IUser>("users", UserSchema);

export { User };
