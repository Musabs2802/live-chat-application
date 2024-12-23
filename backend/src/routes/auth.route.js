const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
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
            return res.status(409).json({ message: 'User Already Exists' })
        }

        const hash = await bcrypt.hash(password, 10)
        let maleAvatars = Array.from({ length: 50 }, (_, i) => i + 1)
        let femaleAvatars = Array.from({ length: 50 }, (_, i) => i + 51)
        let randomPic = gender == "male" ? `https://avatar.iran.liara.run/public/${maleAvatars[Math.floor(Math.random() * maleAvatars.length)]}` : `https://avatar.iran.liara.run/public/${femaleAvatars[Math.floor(Math.random() * femaleAvatars.length)]}`

        const newUser = new User({
            firstName,
            lastName,
            username,
            password: hash,
            gender,
            displayPic: randomPic,
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
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt })
            }
            else {
                return res.status(401).json({ message: "Wrong Password" })
            }
        }
        else {
            return res.status(401).json({ message: "No User Found !" })
        }
    } 
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

router.post('/change-password', authenticate, async(req, res) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body

        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(422).json({ message: "Field(s) missing" })
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" })
        }

        const user = await User.findById(req.user.id)
        if (user) {
            const isPasswordMatch = await bcrypt.compare(oldPassword, user.password)
            if (isPasswordMatch) {
                const hash = await bcrypt.hash(newPassword, 10)

                user.password = hash
                await user.save()

                res.status(200).json({ message: "Password Changed" })
            }
            else {
                return res.status(401).json({ message: "Wrong Password" })
            }
        }
        else {
            return res.status(401).json({ message: "No User Found !" })
        }
    }
    catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message });
    }
})

router.post("/logout", async (req, res) => {
    try {
        const { userId } = req.body

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;
