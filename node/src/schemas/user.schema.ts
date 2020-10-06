const mongoose = require('mongoose');
const validator = require('validator');

const { ObjectId } = mongoose.Types;

const Schema = mongoose.Schema;

const User = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Do insert a real email']
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Password is required']
  },
  emailConfirmed: {
    type: Boolean,
    default: false
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