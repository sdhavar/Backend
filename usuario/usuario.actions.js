const UserModel = require("../usuario/usuario.model.js");
const AuthController = require("../auth/auth.jwt.js");
const argon2 = require('argon2');

async function fetchUserFromMongo(filters) {
  if (!filters.hasOwnProperty("deleted")) {
    filters["deleted"] = false;
  }
  const user = await UserModel.findOne(filters);
  return {
    user: user,
  };
}

async function fetchUserByIdFromMongo(id) {
  const userFound = await UserModel.findById(id);
  return userFound;
}

async function createUserInMongo(data) {
  const hashedPassword = await argon2.hash(data.password);
  const userData = {
    name: data.name,
    email: data.email,
    password: hashedPassword
  };
  const user = await UserModel.create(userData);
  return {
    user,
  };
}

async function loginUserInMongo(credentials) {
  const { email, password } = credentials;
  const user = await UserModel.findOne({ email: email });
  if (!user || !(await argon2.verify(user.password, password))) {
    throw new Error("Credenciales incorrectas");
  }
  const payload = { _id: user._id };
  try {
    return AuthController.generateToken(payload);
  } catch (error) {
    console.log(error);
  }
}

async function updateUserInMongo(id, update) {
  const updatedUser = await UserModel.findByIdAndUpdate(id, update);
  return updatedUser;
}

async function deleteUserInMongo(id) {
  const deletedUser = await UserModel.findByIdAndUpdate(id, { deleted: true });
  return deletedUser;
}

module.exports = {
  fetchUserFromMongo,
  fetchUserByIdFromMongo,
  updateUserInMongo,
  createUserInMongo,
  loginUserInMongo,
  deleteUserInMongo,
};
