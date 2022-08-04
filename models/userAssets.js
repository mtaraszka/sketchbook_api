const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserAssets = new Schema({
  userID: Schema.Types.ObjectId,
  assets: {
    type: Array,
    default: [],
  }
})

module.exports = mongoose.model('UserAssets', UserAssets);
