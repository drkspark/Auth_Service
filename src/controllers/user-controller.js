const { ServerErrorCodes, SuccessCodes } = require("../utils/error-codes");
const UserService = require("../services/user-service");

const userService = new UserService();

const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password,
        });
        return res.status(SuccessCodes.CREATED).json({
            success: true,
            message: "Successfully created a new user",
            data: response,
            err: {},
        });
    } catch (error) {
        console.log(error);
        return res.status(ServerErrorCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error,
        });
    }
};

const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(
            req.body.email,
            req.body.password
        );
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: "Successfully Signed In",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            data: {},
            err: error,
            message: "Something went wrong",
        });
    }
};

const isAuthenticated = async (req, res) => {
    try {
        const token = req.headers['access-token'];
        const response = await userService.isAuthenticated(token);
        return res.status(200).json({
            success: true,
            err: {},
            data: response,
            message: "User is authenticated and token is valid"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong",
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports = {
    create,
    signIn,
    isAuthenticated
};
