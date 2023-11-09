const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  permissionLevel: {
    type: Number,
    require: true,
    default: 1,
  },
  fullName: String,
  phoneNumber: String,
  avatar: {
    type: String,
    default:
      "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png",
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

// userSchema.methods.isValidPassword = (password) => {
//   const user = this;

// }

const UserModel = mongoose.model("Users", userSchema, "Users");
const patchAvatar = async (id, avatarUrl) => {
  try {
    let user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    user.avatar = avatarUrl;
    return user.save();
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createUser: (user) => {
    return UserModel.create(user);
  },
  find: (query) => {
    return UserModel.find(query);
  },
  isEmailExisted: async (email) => {
    const user = await UserModel.find({ email });
    if (user.length) {
      return true;
    }
    return false;
  },
  findById: (id) => {
    return UserModel.findById(id);
  },
  findByEmail: (email) => {
    return UserModel.findOne({ email });
  },
  patchUser: async (id, userData) => {
    let user = await UserModel.findOne({ _id: id });
    Object.assign(user, userData);
    return user.save();
    // return UserModel.findOneAndUpdate({
    //   _id: id
    // }, userData);
  },
  delete: (_id) => {
    return UserModel.findByIdAndDelete(_id);
  },
  list: (perPage, page) => {
    return UserModel.find()
      .limit(perPage)
      .skip(perPage * page)
      .lean();
  },
  patchAvatar,
};
