const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profilePic: {
    type: String,
    default: "/image/luantruong.jpg"
  },
  likes:
    [{
      type: Schema.Types.ObjectId,
      ref: 'Post'
    }],
  retweets: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
},
  {
    timestamps: true,
    methods: {
      async checkEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(this.email)
      },
      async hashPassword() {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
      },
    },
    query: {
      async checkUserExists(username, email) {
        return this.where({ $or: [{ username: username }, { email: email }] });
      }
    }
  }
)
const User = mongoose.model('User', userSchema);
module.exports = User;