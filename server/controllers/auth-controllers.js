const User = require('../models/student-model');
const bcrypt = require('bcryptjs');

const home = async (req, res) => {
    try {
        return res.status(200).send("Welcome to home page using router");
    } catch (error) {
        return res.status(404).send({ msg: 'Page not found' });
    }
}

const register = async (req, res) => {
    try {

        const { username, prn, email, password } = req.body;

        if (!username || !prn || !email || !password) {
            return res.status(401).json({ message: 'Please fill all required fields.' });
        }

        const userExists = await User.findOne({
            $or: [
                { email: email },
                { prn: prn }
            ]
        });

        if (userExists) {
            if (userExists.email === email && userExists.prn === prn) {
                return res.status(401).send("Email and PRN already exist!");
            } else if (userExists.email === email) {
                return res.status(400).send("Email already exists!");
            } else if (userExists.prn === prn) {
                return res.status(400).send("PRN already exists!");
            }
        }

        const userCreated = await User.create({ username, prn, email, password });

        return res.status(200).json({
            message: "User registered successfully!!",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString()
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userExists = await User.findOne({ email: email });

        if (!userExists) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const passwordMatch = await userExists.checkPassword(password);

        if (passwordMatch) {
            res.status(200).json({
                message: "Login Successful",
                token: await userExists.generateToken(),
                userId: userExists._id.toString()
            });
        }
        else {
            res.status(401).json({ message: "Invalid credentials." });
        }

    } catch (error) {
        // console.error("Error in login:", error);
        return res.status(500).json({ message: 'Internal sevrer error' });
    }
}

module.exports = { home, register, login };