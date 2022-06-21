require('dotenv').config();
const http = require('http')
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const app = express();
const UserModel = require('./UserModel');
const axios = require('axios');
const httpServer = require('http').Server(app);
const io = require('socket.io')(httpServer);

 
const access = {username:'',access:''};

app.use(cors());
// create application/json parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

 
 
 
app.get("/users", async (request, response) => {
  const users = await UserModel.find();

  try {
    response.send(users);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.post('/register', function (req, res) {

  const newUser = new UserModel({uid: req.body.uid, activated: true, name: req.body.name});
  newUser.save();
  res.status(200).json({
    status: newUser,
  });
});
// POST /login gets urlencoded bodies
app.post('/getin', function (req, res) {
  let mask_or_not = "";
  const id = req.body.uid;

  axios.get('http://localhost:8080/getresult')
  .then(function (response) {
    // handle success
    console.log(response.data.result);
    mask_or_not = response.data.result;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });

 


  UserModel.findOne({uid: id}, function (err, user) {
    if (err){
      res.status(200).json({
        status: err ,
      });
    }
    else{
      if(mask_or_not==='Mask')
      {
        access.username=user.name;
        access.access = true;
        res.status(200).json(access);
      }
    
      else{
        access.username=user.name;
        access.access = false;
        res.status(200).json(access);
      }
    }


    io.emit('access',Object.values(access));
});


  
    
});

 

io.on('connection', function(socket) {
  console.log('A user connected');
  
  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});

httpServer.listen(process.env.PORT, function() {
  console.log('listening on *:'+process.env.PORT);

 
});