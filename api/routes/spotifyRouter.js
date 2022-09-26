const express = require('express');
require('dotenv').config();
const axios = require('axios')

const clientId = process.env.CLIENT_ID
const clientSecret = process.env.CLIENT_SECRET
const redirectUri = process.env.REDIRECT_URI

const token = require('../models/tokenModel');

const router = express.Router();

// router.get( (code, grant_type, token) => {
//     let data = (grant_type === "refresh_token") 
//       ? qs.stringify({ refresh_token: code, grant_type })
//       : qs.stringify({ code, grant_type, redirectUri }) 
//     return axios({
//         method: 'POST',
//         url: 'https://accounts.spotify.com/api/token', 
//         data,
//         headers: {
//           'Authorization': basicAuth,
//           'Content-Type': 'application/x-www-form-urlencoded'
//         }
//       }).then(({ data }) => {
//         data.expires_in = new Date().getTime() + data.expires_in
//         token.update( data )
//         return token.save()
//       }).catch((error) => { return false })
//   })

// const status = async (req, res, next) => {
//     const valid = (req.Token ) Token.findOne({});
// }

// authorize user login
router.get('/login', async(req, res, next) => {
    const state = generateRandomString(16);
    const scope = [
        'user-read-email', 
        'user-read-private', 
        'user-modify-playback-state', 
        'user-read-playback-state', 
        'user-read-currently-playing',
    ];

    res.redirect('https://accounts.spotify.com/authorize?' + 
    querystring.stringify({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state
    }))
})

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

router.get('/callback', async (req, res) => {
        const token = await Token.findOne({});
        const {code} = req.query;
        const clientId = process.env.CLIENT_ID
        const clientSecret = process.env.CLIENT_SECRET
        const redirectUri = process.env.REDIRECT_URI
        const grant_type = 'authorization_code';
    
        const basicHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
        const {data} = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
            grant_type,
            code,
            redirectUri,
        }), {
            headers: {
                Authorization: `Basic ${basicHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    
        const sessionJWTObject = {
            token: data.access_token,
        };
    
        req.session.jwt = jwt.sign(sessionJWTObject, process.env.JWT_SECRET_KEY)
        return res.redirect('/');
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