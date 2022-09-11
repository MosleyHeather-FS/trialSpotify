const express = require('express');

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI

const router = express.Router();

const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const token = `https://accounts.spotify.com/api/token`;

// authorize user login
router.get('/login', async(req, res, next) => {
    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-email';

    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
    }))
})

// get user profile
router.get("/me", async(req, res, next) => {
    await fetch(token, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${auth}`,
            url: `https://api.spotify.com/v1/me`
        }
    })
    .then( response => response.json())
    .then(data => {
        
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ message: error.message })
    })
})

// get albums
router.get("/me/albums", async(req, res, next) => {
    await fetch(token, {
        method: "GET",
        headers: {
            Authorization: `Basic ${auth}`,
            url: `https://api.spotify.com/v1/me/albums`
        }
    })
    .then( response => response.json())
    .then(data => {
        
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ message: error.message })
    })
})

// get currently playing track
router.get("/me/player/currently-playing", async(req, res, next) => {
    await fetch(token, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${auth}`,
            url: `https://api.spotify.com/v1/me/player/currently-playing`
        }
    })
    .then( response => response.json())
    .then(data => {
        
        res.json(data);
    })
    .catch((error) => {
        res.status(500).json({ message: error.message })
    })
})
