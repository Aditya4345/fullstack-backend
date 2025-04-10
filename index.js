const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/User'); 

const server = express();
server.use(cors());
server.use(bodyParser.json());


mongoose.connect('mongodb+srv://aditya:aditya%40123@leadsoft.i8dhe1b.mongodb.net/?retryWrites=true&w=majority&appName=leadsoft')
  .then(() => {
    console.log('Database connected');
  })
  .catch((err) => console.log(err));


server.post('/register', async (req, res) => {
  try {
    const { fullName, userName, age, password } = req.body;


    const userExist = await User.findOne({ userName });
    if (userExist) {
      return res.json({
        status: false,
        message: "User already exists!",
      });
    }

    
    const userObj = new User({ fullName, userName, age, password });
    await userObj.save();

    res.json({
      status: true,
      message: "User registered successfully!",
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});


server.post('/login', async (req, res) => {
  try {
    const { userName, password } = req.body;

    
    const userExist = await User.findOne({ userName });

    if (!userExist) {
      return res.json({
        status: false,
        message: "User does not exist!",
      });
    }

    
    if (password !== userExist.password) {
      return res.json({
        status: false,
        message: "Incorrect password!",
      });
    }

    res.json({
      status: true,
      message: "Login successful!",
    });
  } catch (err) {
    res.json({
      status: false,
      message: err.message,
    });
  }
});

server.listen(8085, () => {
  console.log('Server is listening on port 8085');
});
