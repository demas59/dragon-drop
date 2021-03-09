import { User } from "../models/user.model";

export default class UserController {
  async getAll() {
    return await User.find({});
  }

  async getByLogin(login: String) {
    return await User.findOne({ login: login });
  }

  async getById(id: String) {
    return await User.findById({ _id: id });
  }

  async updateOne(id: String, update: Object) {
    return User.findByIdAndUpdate(id, update, {
      new: true,
      useFindAndModify: false,
    });
  }

  async deleteByLogin(login: String) {
    return await User.findOneAndDelete({ login: login });
  }
}
