const express = require("express");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../models/user.model");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { firstName, lastName, username, password, confirmPassword, gender } = req.body
        
        if (!firstName || !lastName || !username || !password || !confirmPassword || !gender) {
            return res.status(422).json({ message: "Field(s) missing" })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" })
        }   

        const user = await User.findOne({ username })
        if (user) {
            return res.status(409).json({message: 'User Already Exists'})
        }

        const hash = await bcrypt.hash(password, 10)

        let randomPic = gender == "male" ? "https://avatar.iran.liara.run/public/boy" : "https://avatar.iran.liara.run/public/girl"

        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hash,
            gender,
            displayPic: randomPic,
            createdAt,
            updatedAt
        })
        await newUser.save()
        
        res.status(201).json({ message: "Item created", _id: newUser._id })
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body
        
        if(!username || !password) {
            return res.status(422).json({ message: "Field(s) missing" })
        }

        const user = await User.findOne({ username })
        if (user) {
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (isPasswordMatch) {
                const accessToken = jwt.sign({ userId: user._id }, 
                    process.env.JWT_ACCESS_TOKEN, 
                    { subject:'accessToken', expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN })

                return res.status(200).json({ 
                    id: user._id, 
                    firstName: user.firstName,
                    lastName: user.lastName,
                    username: user.username,
                    gender: user.gender,
                    displayPic: user.displayPic,
                    accessToken,
                    updatedAt })
            }
            else {
                return res.status(401).json({ message: "Unauthorized" })
            }
        }
        else {
            return res.status(401).json({ message: "Unauthorized" })
        }
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post("/logout", async (req, res) => {
    try {
        const { userId } = req.body

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
