const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.Types;

const Schema = mongoose.Schema;

const User = new Schema({
  googleID: {
    type: String,
    unique: true,
    required: [true, 'Google ID is required']
  },
  fullName: {
    type: String,
    required: [true, 'Full name is required']
  },
  givenName: {
    type: String,
    required: [true, 'Given name is required']
  },
  familyName: {
    type: String,
    required: [true, 'Family name is required']
  },
  imageURL: {
    type: String,
    required: [true, 'Image url is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Do insert a real email']
  },
  gold: {
    type: Number,
    default: 100
  },
  level: {
    type: Number,
    default: 0
  },
  exp: {
    type: Number,
    default: 0
  },
  progress: {
    type: Number,
    default: 0
  },
  skins: {
    type: [ObjectId]
  },
  createTime: {
    type: Date,
    required: [true, 'Create time is required']
  },
  updateTime: {
    type: Date,
    required: [true, 'Update time is required']
  }
});

const UserModel = mongoose.model('UserModel', User);

export default UserModel;