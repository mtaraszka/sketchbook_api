const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  type: String,
  data: Buffer,
  alt: {
    type: String,
    default: '',
  },
  author: Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now
  },
  comments: [{
    body: String,
    author: {
      name: String,
      id: Schema.Types.ObjectId
    },
    date: Date,
  }],
  meta: {
    tags: {
      type: Array,
      default: [],
    },
    likes: {
      type: Number,
      default: 0,
    },
    dislikes: {
      type: Number,
      default: 0,
    }
  }
})

module.exports = mongoose.model('Image', ImageSchema);
