const validateUserAuth = (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({
            success: false,
            data: {},
            message: "Something went wrong",
            err: "Email or Password missing in req body" 
        });
    }

    next();
}

module.exports = {
    validateUserAuth
}