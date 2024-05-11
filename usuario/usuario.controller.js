const { createUserInMongo, fetchUserFromMongo, deleteUserInMongo, updateUserInMongo, loginUserInMongo, fetchUserByIdFromMongo } = require("../usuario/usuario.actions");

async function fetchUser(query) {
    const searchResults = await fetchUserFromMongo(query);
    return searchResults;
}

async function findUserById(id) {
    const user = await fetchUserByIdFromMongo(id);
    return user;
}

async function loginUser(credentials) {
    const cookie = await loginUserInMongo(credentials);
    return cookie;
}

async function createUser(data) {
    const createdUser = await createUserInMongo(data);
    return createdUser;
}

async function updateUser(data) {
    const { _id, ...changes } = data;
    const updatedUser = await updateUserInMongo(_id, changes);
    return updatedUser;
}

async function deleteUser(id) {
    const deletedUser = await deleteUserInMongo(id);
    return deletedUser;
}

module.exports = {
    fetchUser,
    findUserById,
    createUser,
    updateUser,
    loginUser,
    deleteUser
};
