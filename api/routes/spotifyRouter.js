const express = require('express');

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI

const router = express.Router();



// get user profile
router.get("/me", async(req, res, next) => {
    await fetch("https://api.spotify.com/v1/me")
    .then( response => response.json())
    .then(data => {
        
        res.json(data);
    })
})

// get albums
router.get("/me/albums", async(req, res, next) => {
    await fetch("https://api.spotify.com/v1/me/albums")
    .then( response => response.json())
    .then(data => {
        
        res.json(data);
    })
})

// get currently playing track
router.get("/me/player/currently-playing", async(req, res, next) => {
    await fetch("https://api.spotify.com/v1/me/player/currently-playing")
    .then( response => response.json())
    .then(data => {
        
        res.json(data);
    })
})

// get all
router.get('/', async (req, res) => {
    try {
        const albums = await Album.find()
        res.json(albums)
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
})

// get one
router.get('/:id', getAlbum, async (req, res) => {
    res.json(res.album)
})