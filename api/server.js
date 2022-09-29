const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

const PORT = process.env.PORT || 3000;
const DATABASE_URL = process.env.DATABASE_URL;

const spotifyRouter = require('./routes/spotifyRouter');


mongoose.connect(DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log("Database Connection Established"))

app.use(express.json())
app.use('/spotify/v1', spotifyRouter)

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})