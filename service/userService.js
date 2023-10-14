const userModel = require("../model/userModel");

class UserService {
    async getUsers(limit) {
        return await userModel.getUsers(limit);
    }

    async getUserById(id) {
        return await userModel.getUserById(id);
    }
}

module.exports = new UserService();