const express = require("express");
const authenticate = require("../middlewares/authenticate.middleware");
const User = require("../models/user.model");
const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { io, getReceiverSocketId } = require("../config/socket.config");

const router = express.Router();

router.get("/:targetId", authenticate, async(req, res) => {
    const { targetId } = req.params

    if (!targetId) {
        return res.status(422).json({ message: "Field(s) missing" })
    }

    const user = await User.findById(req.user.id)
    if(user) {
        let conversation = await Conversation.findOne({ participants: { $all: [user._id, targetId] } }).populate("messages")
        if (conversation) {
            return res.status(200).json({ conversation })
        }
        else {
            return res.status(200).json({})
        }
    }
    else {
        return res.status(401).json({ message: "Unauthorized" })
    }
})

router.post("/send/:targetId", authenticate, async(req, res) => {
    try {
        const { targetId } = req.params
        const { message } = req.body

        if(!targetId || !message) {
            return res.status(422).json({ message: "Field(s) missing" })
        }

        const user = await User.findById(req.user.id)
        if(user) {
            let conversation = await Conversation.findOne({ participants: { $all: [user._id, targetId] } })
            if (!conversation) {
                conversation = await Conversation.create({ participants: [user._id, targetId] })
            }

            const newMessage = new Message({
                senderId: user._id,
                receiverId: targetId,
                message
            })

            conversation.messages.push(newMessage)

            await Promise.all([conversation.save(), newMessage.save()])

            const receiverSocketId = getReceiverSocketId(targetId)
            if(receiverSocketId) {
                io.to(receiverSocketId).emit("newMessage", newMessage)
            }

            res.status(201).json({ newMessage })
        }
        else {
            return res.status(401).json({ message: "Unauthorized" })
        }
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = router