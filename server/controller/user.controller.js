const userModel = require("../model/users.model");
const validation = require("../helper/verify.helper");
const crypto = require("crypto");

module.exports.profile = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  user = user.toJSON();
  delete user._id;
  delete user.__v;
  delete user.hashedPassword;
  //console.log(user);
  // if (!user) {
  //   return res.status(404).json({ errors: ['Not found'] });
  // }
  res.status(200).json(user);
};

module.exports.userRegistaion = async (req, res) => {
  if (!validation.emailValidation(req.body.email)) {
    res.status(400).json({ error: "invalid email" });
    return;
  }
  if (await userModel.isEmailExisted(req.body.email)) {
    res.status(400).json({ error: "email is already exist" });
    return;
  }
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.hashedPassword = salt + "$" + hash;
  //req.body.permissionLevel = 1;
  let user = await userModel.createUser(req.body);
  user = user.toJSON();
  delete user.hashedPassword;
  res.status(201).json(user);
};

module.exports.getUser = async (req, res) => {
  let user = await userModel.findById(req.params.id);
  if (user) {
    user = user.toJSON();
    delete user.__v;
    delete user.hashedPassword;
  }
  //console.log(user);
  // if (!user) {
  //   return res.status(404).json({ errors: ['Not found'] });
  // }
  res.status(200).json(user);
};

module.exports.patchById = async (req, res) => {
  if (req.body.password) {
    let salt = crypto.randomBytes(16).toString("base64");
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    req.body.hashedPassword = salt + "$" + hash;
  }
  userModel.patchUser(req.params.id, req.body).then((result) => {
    if (result) {
      result = result.toJSON();
      delete result.hashedPassword;
    }
    res.status(200).json(result);
  });
  // if (updatedUser.hashedPassword != null)
  //   delete updatedUser.hashedPassword;
  //res.status(200).json(updatedUser);
};

module.exports.removeById = async (req, res) => {
  let query = await userModel.delete(req.params.id);
  res.status(200).json(query);
};

module.exports.listUser = async (req, res) => {
  let limit =
    req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  try {
    let users = await userModel.list(limit, page);
    for (let i = 0; i < users.length; i++) {
      delete users[i].hashedPassword;
    }
    res.status(200).json(users);
  } catch (e) {
    console.error(e);
    res.status(500).json();
  }
};
module.exports.updateAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const { avatarUrl } = req.body;
    const updatedUser = await userModel.patchAvatar(userId, avatarUrl);

    // Trả về kết quả
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ error: "Failed to update avatar" });
  }
};
module.exports.changePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    // Kiểm tra xem mật khẩu cũ có đúng không
    let user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const [salt, hash] = user.hashedPassword.split("$");
    const hashedOldPassword = crypto
      .createHmac("sha512", salt)
      .update(oldPassword)
      .digest("base64");

    if (hashedOldPassword !== hash) {
      return res.status(400).json({ error: "Incorrect old password" });
    }

    // Tạo mật khẩu mới
    const newSalt = crypto.randomBytes(16).toString("base64");
    const newHash = crypto
      .createHmac("sha512", newSalt)
      .update(newPassword)
      .digest("base64");

    // Cập nhật mật khẩu mới trong cơ sở dữ liệu
    const updatedUser = await userModel.patchUser(userId, {
      hashedPassword: newSalt + "$" + newHash,
    });

    // Trả về kết quả
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Failed to change password" });
  }
};
// Trong UserController
module.exports.updateProfile = async (req, res) => {
  const userId = req.params.id;
  const { fullName, phoneNumber } = req.body;

  try {
    // Kiểm tra xem người dùng có tồn tại không
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (fullName) {
      user.fullName = fullName;
    }

    if (phoneNumber) {
      user.phoneNumber = phoneNumber;
    }

    // Lưu thông tin cập nhật vào cơ sở dữ liệu
    await userModel.patchUser(userId, user);

    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating profile:", error);
    res
      .status(400)
      .json({ error: error.message || "Failed to update profile" });
  }
};
