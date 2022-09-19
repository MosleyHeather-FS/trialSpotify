const express = require('express');

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI

const Token = require('../models/tokenModel');

const router = express.Router();

//const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
//const token = `https://accounts.spotify.com/api/token`;

router.get('/refresh_token', function(req, res) {

    const refresh_token = req.query.refresh_token;
    const token = {
      url: 'https://accounts.spotify.com/api/token',
      headers: { 'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64')) },
      form: {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      },
      json: true
    };
  
    request.post(token, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        res.send({
          'access_token': access_token
        });
      }
    });
  });

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

router.get('/callback', function(req, res) {

    const code = req.query.code || null;
    const state = req.query.state || null;
  
    if (state === null) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      const token = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
    }
  });

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

module.exports = router;