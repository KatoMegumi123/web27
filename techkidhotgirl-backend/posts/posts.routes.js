const express = require('express');
const Joi = require('@hapi/joi');
const PostModel = require('./posts.model');

const postRouter = express.Router();

postRouter.post('/create-post', async (req, res) => {
  if (!req.session.currentUser || !req.session.currentUser.email) {
    res.status(403).json({
      success: false,
      message: 'Forbidden',
    });
  }
  else {
    console.log(req.body);
    const postValidateSchema = Joi.object().keys({
      content: Joi.string().required(),
      imageUrl: Joi.string().required(),

    });
    const validateResult = Joi.validate(req.body, postValidateSchema);
    if (validateResult.error) {
      const error = validateResult.error.details[0];
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
    else {
      try {
        const newPost = await PostModel.create({
          imageUrl: req.body.imageUrl,
          content: req.body.content,
          author: req.session.currentUser._id,
        });
        res.status(201).json({
          success: true,
          data: newPost,
        })
      } catch (err) {
        res.status(500).json({
          success: true,
          message: err.message,
        })
      }
    }
  }
});

postRouter.get("/:postId", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId)
      .populate('author', "_id email fullName avatarUrl")
      .lean();
    res.status(200).json({
      success: true,
      data: post,
    })
  }
  catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
});

postRouter.get('/get/posts', async (req, res) => {
  const validateSchema = Joi.object().keys({
    pageNumber: Joi.number().min(1),
    pageSize: Joi.number().min(1).max(50),
  });
  const pageNumber = Number(req.query.pageNumber);
  const pageSize = Number(req.query.pageSize)
  ;
  const validateResult = Joi.validate({pageNumber: pageNumber,pageSize: pageSize}, validateSchema);
  if (validateResult.error) {
    const error = validateResult.error.details[0];
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  else {
    const result = await PostModel.find({}).populate('author', 'fullName email').sort({createAt: -1, fullName: -1}).skip((pageNumber - 1) * pageSize).limit(pageSize).lean();
    const total = await PostModel.find({}).countDocuments();
    res.status(201).json({
      success: true,
      data: {
        data: result,
        total: total,
      }
    })
  
  }
})

module.exports = postRouter;