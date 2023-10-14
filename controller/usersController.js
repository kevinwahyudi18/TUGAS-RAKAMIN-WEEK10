const userService = require("../service/userService");

const getUsers = async (req, res) => {
    try {
        const limit = req.query.limit;
        const users = await userService.getUsers(limit);
        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Internal Server Error", detail: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.getUserById(id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: "User Not Found" });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Internal Server Error", detail: error.message });
    }
};

module.exports = {
    getUsers,
    getUserById,
};