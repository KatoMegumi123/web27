var express = require("express")
var userRouter = express.Router();
var emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const UsersModel = require('./users.model');
const bcrypt = require('bcryptjs');

userRouter.post('/register', async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const fullName = req.body.fullName;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email adress',
      });
    } else if (password.length < 6) {
      res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    } else {
      var hashPassword = bcrypt.hashSync(password, 8);
      let data = await UsersModel.findOne({ email: email }).lean();
      if (data) {
        res.status(400).json({
          success: false,
          message: 'Email has been used'
        })
      } else {
        let newData = await UsersModel.create({ email: email, password: hashPassword, fullName: fullName });
        res.status(201).json({
          success: true,
          data: newData,
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    let data = await UsersModel.findOne({ email: email }).lean();
    if (!data) {
      res.status(400).json({
        success: false,
        message: 'Email not found'
      })
    } else {
      if (bcrypt.compareSync(password, data.password)) {
        req.session.currentUser = {
          _id: data._id,
          email: data.email,
          fullName: data.fullName,
        };

        res.status(200).json({
          success: true,
          message: "Login success",
          data: {
            email: data.email,
            fullName: data.fullName,
          },
        })
      }
      else {
        res.status(400).json({
          success: false,
          message: "Wrong password",
        })
      }
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

userRouter.get('/logout',(req,res)=>{
  req.session.destroy();
  res.status(200).json({
    success: true,
    message: "Log out success",
  })
});

userRouter.get('/test',(req,res)=>{
  console.log(req.session.currentUser);
  res.json({
    success: true,
    data: req.session.currentUser,
  })
});

userRouter.post('/upload',async (req,res)=>{
  if(!req.session.currentUser)
  {
    res.status(400).json({
      success: false,
      message: 'Bad request',
    });
    return;
  }
  const id = req.session.currentUser._id;
  if(id)
  {
    var newStory = {
      title: req.body.title,
      content: req.body.content,
    }
    console.log(newStory);
    UsersModel.findByIdAndUpdate(id,{$push: {stories: newStory}},(err,data)=>{
      if(err)
      {
        res.status(500).json({
          success: false,
          message: err.message,
        });
      }
      else
      {
        res.status(200).json({
          success: true,
          data: newStory,
        });
      }
    });
  }
  else
  {
    res.status(400).json({
      success: false,
      message: 'Bad request',
    });
  }
});

module.exports = userRouter;