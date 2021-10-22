const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username cannot be with less than 3 characters!']
    },
    password: {
        type: String,
        minlength: [6, 'Your password should be at least 6 characters!'],
        required: true,
    },
});

userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', userSchema);

module.exports = User;