const express = require('express');
const bodyParser = require('body-parser');
const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

const app = express();

const prepareAndStartServer = () => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);

    app.listen(PORT, async () => {
        console.log(`Server Started on Port: ${PORT}`);
        // const service = new UserService();
        // const newToken = service.createToken({email: 'drkspark@hotmail.com', id: 2});
        // console.log(newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRya3NwYXJrQGhvdG1haWwuY29tIiwiaWQiOjIsImlhdCI6MTY3NDk4NDI2MiwiZXhwIjoxNjc1MDcwNjYyfQ.iil1z7aHWwGORCnECPlpJvc0rTBU9ZAaWTm6v3dIBGM';
        // const veri = service.verifyToken(token);
        // console.log(veri);
    });
}   

prepareAndStartServer();