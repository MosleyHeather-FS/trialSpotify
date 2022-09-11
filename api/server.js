const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 6000;

const spotifyRouter = require('./routes/spotify');
const authRouter = require('./routes/auth');

const DATABASE_URL = process.env.DATABASE_URL;

mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log("Database Connection Established"))

app.use(express.json())
app.use('/api/v1/spotifyRouter', spotifyRouter)
app.use('/apiv1/authRouter', authRouter)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})