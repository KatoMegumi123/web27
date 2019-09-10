const mongoose = require('mongoose');

const NewStorySchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    require: true,
  },
  createdAt:{
    type: Date,
    default: new Date(),
  }
});

const HotGirlSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  avatarUrl: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  lastModifedAt: {
    type: Date,
  },
  stories: [NewStorySchema],
});

const HotGirlsModel = mongoose.model('HotGirls', HotGirlSchema);

module.exports = HotGirlsModel;