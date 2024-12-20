const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const User = require("../models/user.model");
const Conversation = require("../models/conversation.model");

const router = express.Router()

router.get("/me", authenticate, async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(user) {
            res.status(200).json({ user })
        }
        else {
            return res.status(401).json({ message: "Unauthorized" })
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.put("/me", authenticate, async(req, res) => {
    try {
        const { firstName, lastName, gender } = req.body

        if (!firstName || !lastName || !gender) {
            return res.status(422).json({ message: "Field(s) missing" })
        }

        const user = await User.findOne(req.user.id)
        if (user) {
            return res.status(401).json({ message: "No User Found !" })
        }
        else {
            user.firstName = firstName;
            user.lastName = lastName;
            user.gender = gender;

            await user.save();

            return res.status(200).json({})
        }
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
})

router.get("/all", authenticate, async(req, res) => {
    try {
        const user = await User.findById(req.user.id)
        if(user) {
            let allUsers = await Conversation.find({ participants: user._id }).populate({
                path: 'participants',
                select: '-password'
              })
              .populate({
                path: 'messages', 
                options: { sort: { createdAt: -1 }, limit: 1 },
              })
              .select('participants messages -_id')

            allUsers = allUsers.map(m => (
                { user: m.participants.filter(f => !f._id.equals(user._id))[0], 
                    message: m.messages[0]
                }))

            res.status(200).json({ users: allUsers })
        }
        else {
            return res.status(401).json({ message: "Unauthorized" })
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

router.get('/search/:query', authenticate, async(req, res) => {
    try {
        const { query } = req.params

        const users = await User.find({
            $or: [
              { firstName: { $regex: query, $options: 'i' } },
              { lastName: { $regex: query, $options: 'i' } },
              { username: { $regex: query, $options: 'i' } }
            ],
            _id: { $ne: req.user.id }
        })
        .select('_id firstName lastName displayPic username');

        res.status(200).json(users)
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = router