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
    const postValidateSchema = Joi.object().keys({
      imageUrl: Joi.string().required(),
      content: Joi.string().required(),
    });
    const validateResult = Joi.validate(req.body, postValidateSchema);
    if (validateResult.error) {
      const error = validateResult.error.details[0];
      res.status(400).json({
        sucess: false,
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
          sucess: true,
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

module.exports = postRouter;