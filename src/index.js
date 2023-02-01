const express = require("express");
const bodyParser = require("body-parser");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");

const db = require("./models/index");
const { User, Role } = require("./models/index");

const app = express();

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/api", apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);

        if (process.env.DB_Sync) {
            db.sequelize.sync({ alter: true });
        }

        // const u1 = await User.findByPk(3);
        // const r1 = await Role.findByPk(1);
        // u1.addRole(r1);
        // const response = await u1.getRoles();
        // const response = await r1.getUsers();
        // const response = await u1.hasRole(r1);

        // console.log(response);

        // const service = new UserService();
        // const newToken = service.createToken({email: 'drkspark@hotmail.com', id: 2});
        // console.log(newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRya3NwYXJrQGhvdG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTY3NDk4NDI2MiwiZXhwIjoxNjc1MDcwNjYyfQ.iil1z7aHWwGORCnECPlpJvc0rTBU9ZAaWTm6v3dIBGM';
        // const veri = service.verifyToken(token);
        // console.log(veri);
    });
};

prepareAndStartServer();
