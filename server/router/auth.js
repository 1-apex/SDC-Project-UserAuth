const express = require('express');
const router = express.Router();

const User = require('../model/userSchema');

router.get("/", (req, res) => {
    try {
        res.status(200).send("Welcome to the home page from router");
    } catch (error) {
        console.log("Error occured while fetching the data" + error);
    }
});

router.post('/register', async (req, res) => {
    // res.status(200).send("Welcome to the home page from router");

    const { name, email, phone, password, confirm_password } = req.body;

    if (!name || !email || !phone || !password || !confirm_password) {
        return res.status(422).json({ error: 'Please fill all the requied fields!' });
    }

    try {
        const UserExists = await User.findOne({ email: email });

        if (UserExists) {
            return res.status(422).json({ error: 'Email already exists!' });
        }

        // create a new user in database
        const user = new User({ name, email, phone, password, confirm_password });

        // save/udpate the database with the new user
        const user_registered = await user.save();

        if (user_registered) {
            res.status(201).send('User created successfully!');
        }
    } catch (err) {
        res.status(500).send({ error: err });
    }
})

router.post('/signin', async (req, res) => {
    // res.status(200).send(req.body);

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ error: 'Please fill all the requied fields!' });
        }

        // find whether the use exists by comparing email and password
        const userLogin = await User.findOne({ email: email, password: password });

        if (userLogin != null) {
            res.status(200).send("User login successfull!");
        }
        else {
            res.status(400).send("Invalid Credentials :(");
        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;