const express = require("express");

const router = express.Router();

router.post("/send", async(req, res) => {
    try {
        const { targetId, message } = req.body

        if(!targetId || !message) {
            return res.status(422).json({ message: "Field(s) missing" })
        }

        
    }
    catch(error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = router