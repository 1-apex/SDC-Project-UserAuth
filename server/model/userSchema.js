const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    confirm_password: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]
})

// hashing the password 
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.confirm_password = await bcrypt.hash(this.confirm_password, 12);
    }
    next();
})

// generating token
userSchema.methods.generateAuthToken = async function (next) {
    try {
        // jwt.sign(payload, secret_key); 
        // payload : must be unique

        // generate token
        let token = jwt.sign({ __id: this.__id }, process.env.SECRET_KEY);

        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('registrations', userSchema);

module.exports = User;