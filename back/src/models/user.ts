// import { model, Schema, Model, Document } from "mongoose";

// interface IUser extends Document {
//   id: Number;
//   firstname: String;
//   lastname: String;
//   role: String;
//   login: String;
//   password: String;
//   friends: [Number];
// }

// const UserSchema: Schema = new Schema({
//   id: { type: Number, required: true },
//   firstname: { type: String, required: true },
//   lastname: { type: String, required: true },
//   role: { type: String, required: true },
//   login: String,
//   password: String,
//   friends: [Number],
// });

// const User: Model<IUser> = model("user", UserSchema);

// export { User };

import mongoose from "mongoose";

interface IUser {
  id: number;
  firstname: string;
  lastname: string;
}

interface userModelInterface extends mongoose.Model<UserDoc> {
  build(attr: IUser): UserDoc;
}

interface UserDoc extends mongoose.Document {
  id: number;
  firstname: string;
  lastname: string;
}

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (attr: IUser) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, userModelInterface>("users", userSchema);

export { User };
