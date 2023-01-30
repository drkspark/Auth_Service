const { User } = require("../models/index");

class UserRepository {
    async create(data) {
        try {
            const user = await User.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            await User.destroy({
                where: {
                    id: userId,
                },
            });
            return true;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async getById(userId) {
        try {
            const response = await User.findByPk(userId, {
                attributes: ["email", "id"],
            });
            return response;
        } catch (error) {
            console.log("Something went wrong on repository layer");
            throw error;
        }
    }

    async findByEmail(userEmail) {
        try {
            const user = await User.findOne({
                where: {
                    email: userEmail,
                },
            });
            return user;
        } catch (error) {
            console.log("Something went wrong in repository layer");
            throw error;
        }
    }
}

module.exports = UserRepository;
