const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fields = {
  email: {
    type: String
  },
  confirmed: {
    type: Boolean,
    default: false
  }
}

// creation of Schema.
const userSchema = new Schema(fields)

module.exports = mongoose.model('User', userSchema)