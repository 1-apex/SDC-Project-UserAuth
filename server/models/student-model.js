const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const StudentSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    prn: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

// check the password
StudentSchema.methods.checkPassword = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        // console.log(error);
        return error;
    }
}

// secure the password
StudentSchema.pre('save', async function () {
    const user = this;

    if (!user.isModified('password')) {
        next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
})

// json web token
StudentSchema.methods.generateToken = async function () {
    try {
        return jwt.sign({
            // payload
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin
            },
            // signature
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        )
    } catch (error) {
        // console.log(error);
        return error;
    }
}

const User = new mongoose.model('students', StudentSchema);

module.exports = User;