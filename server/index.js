const express = require("express")
const mongoose = require('mongoose')
require("dotenv").config();
const app = express()

const port = process.env.APP_PORT
const dbpass = process.env.DB_PASSWORD

app.use(express.json());

const cors = require("cors");

app.use(
  cors({
    exposedHeaders: ["Authorization"],
    origin: [
      process.env.CLIENT_URL
    ],
    credentials: true
  })
);

const cookieParser = require("cookie-parser");

app.use(cookieParser());

mongoose.connect(`mongodb+srv://anthonydufrenot:${dbpass}@backendb.9mhl0om.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackenDB`)
  .then(() => {
    console.log('Connected!')
    app.listen(port, () => {
        console.log('Server is running on 3310 port');
    })
});

const apiRouter = require('./router/router')

app.use("/api", apiRouter)