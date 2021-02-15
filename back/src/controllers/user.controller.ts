import { User } from "../models/user.model";

export default class UserController {
  async getAll() {
    return await User.find({});
  }

  async getByLogin(login: String) {
    return await User.findOne({ login: login });
  }
}
