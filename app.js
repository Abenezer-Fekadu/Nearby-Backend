const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

// Env Config
require("dotenv").config();
const PORT = process.env.PORT || 8000


// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const motherRoutes = require('./routes/mother');
const foodRoutes = require('./routes/food');


// App 
const app = express();

// Middle-wares
app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cookieParser());

// DB Connect
mongoose
    .connect(process.env.DATABASE_URI, {
    })
    .then(() => console.log("Db Connected"))
    .catch(err => console.log("Could not connect to mongoDB...", err));


// Rotes Middle-ware
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", motherRoutes);
app.use("/api", foodRoutes);


// Run Server
app.listen(PORT, () => console.log(`listening on port ${PORT}.....`));
