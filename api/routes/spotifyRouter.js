const express = require('express');

const router = express.Router();

const getAlbums = async (req, res, next) => {
    let album 
    try {
        album = await Album.findById(req.params.id)
        if(album === null){
            return res.status(404).json({ message: message.notFound})
        }
    } catch(error) {
        return res.status(500).json({ message: error.message })
    }
    res.album = album;
    next();
}

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