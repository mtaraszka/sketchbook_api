const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema({
    name: {
        type: String,
        minLenth: 5,
        maxLength: 25,
        required: [true, 'Name not provided.']
    },
    email: {
        type: String,
        unique: [true, 'Email already taken.'],
        lowercase: true, 
        trim: true,
        required: [true, 'Email not provided.'],
        validate: {
            validator: (value) => {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: `This is not a valid email!`
        }
    },
    password: {
        type: String,
        required: [true, 'Password not provided.']
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('User', userSchema);
