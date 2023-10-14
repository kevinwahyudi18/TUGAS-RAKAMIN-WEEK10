const pool = require("../queries.js");

class User {
    static async getUsers(limit) {
        let query = 'SELECT * FROM users';
        if (limit) {
            query += ` LIMIT ${parseInt(limit)}`;
        }
        return pool.query(query);
    }

    static async getUserById(id) {
        const query = 'SELECT * FROM users WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];
    }
}

module.exports = User;