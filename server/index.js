const express = require("express")
const mongoose = require('mongoose')
require("dotenv").config();
const app = express()

const port = process.env.APP_PORT
const dbpass = process.env.DB_PASSWORD
console.log(dbpass);

mongoose.connect(`mongodb+srv://anthonydufrenot:${dbpass}@backendb.9mhl0om.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackenDB`)
  .then(() => {
    console.log('Connected!')
    app.listen(port, () => {
        console.log('Server is running on 3310 port');
    })
});