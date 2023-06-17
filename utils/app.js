const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const cors = require("cors");
const compoundDataRoutes = require("../routes/compoundDataRoutes");

const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}

const createServer = () => {
    const app = express();
    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'templates/assets')));
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cors(corsOptions))
    app.use("/api/compound", compoundDataRoutes.router)
    return app;
}

module.exports = {
    createServer
}