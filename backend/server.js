const express = require('express')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.get('/', async(req, res) => {
    res.status(200).json({ message: 'Success' })
})

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`))