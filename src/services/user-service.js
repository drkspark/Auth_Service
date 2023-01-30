const UserRepository = require("../repository/user-repository");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_KEY } = require("../config/serverConfig");

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }
    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, { expiresIn: "1d" });
            return result;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    verifyToken(token) {
        try {
            const result = jwt.verify(token, JWT_KEY);
            return result;
        } catch (error) {
            console.log("Something went wrong in token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(
                userInputPlainPassword,
                encryptedPassword
            );
        } catch (error) {
            console.log("Something went wrong in Password comparision");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            //  Step 1: Fetching User Email
            const user = await this.userRepository.findByEmail(email);
            // Step 2: Check the Plain Password and Hashed Password
            const passwordMatch = this.checkPassword(plainPassword, user.password);
            
            if (!passwordMatch) {
                console.log("Password doesn't match");
                throw {error: "Incorrect Password"};
            }

            // Step 3: Create a new JWT Token and send back
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT;
        }
        catch (error) {
            console.log("Something went wrong in the sign in process");
            throw error;
        }
    }
}

module.exports = UserService;
