const express = require('express');
const router = express.Router();
const songController = require('../controllers/songs.controller');
const validations = require('../validations/index')


router
.get('/', songController.getAllSongs)
.post('/get-songs', songController.getSongsByIds)
.get('/:songId', songController.getSongById)
.get('/artist/:artist', songController.getSongsByArtist) //we can filter from the whole list of songs
.get('/album/:album', songController.getSongsByAlbum) // ^^
.get('/genre/:genre', songController.getSongsByGenre) // ^^
.get('/year/:year', songController.getSongsByYear) // ^^

    

module.exports = router;