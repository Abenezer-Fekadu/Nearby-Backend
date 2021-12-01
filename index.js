const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');


// Env
const PORT = process.env.PORT || 8000


// Import Routes
const authRoutes = require('./routes/auth');

// App 
const app = express();

// Middle-wares
app.use(morgan);
app.use(bodyParser.json());
app.use(cookieParser());

// DB Connect
mongoose
    .connect(process.env.DATABASE, {
    userNewUrlParser: true,
    userCreateIndex: true,
    })
    .then(() => console.log("Db Connected"));


// Rotes Middle-ware
app.use("/api", authRoutes);

// Run Server
app.listen(PORT, () => console.log("listening on port ${PORT}....."));
