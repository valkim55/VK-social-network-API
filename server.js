// import express
const express = require('express');

// import mongoose
const mongoose = require('mongoose');

// initialize an express app and port
const app = express();
const PORT = process.env.PORT || 3001;

// setup express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require(('./routes')));

// setup mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/social-network-API', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
// log the execution of mongo queries
mongoose.set('debug', true);

// listen on port
app.listen(PORT, () => console.log(`Connected on ${PORT}`));