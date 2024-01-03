/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: Song management
 */

const express = require("express");
const router = express.Router();
const songController = require("../controllers/songs.controller");
const validations = require("../validations/index");

/**
 * @swagger
 * /songs/:
 *   get:
 *     summary: Get all songs
 *     description: Retrieve a list of all songs
 *     tags: [Songs]
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/", songController.getAllSongs);

/**
 * @swagger
 * /songs/get-songs:
 *   post:
 *     summary: Get songs by IDs
 *     description: Retrieve songs based on provided IDs
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: string
 *             description: Array of song IDs
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.post("/get-songs", songController.getSongsByIds);

/**
 * @swagger
 * /songs/:songId:
 *   get:
 *     summary: Get song by ID
 *     description: Retrieve a song based on its ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: songId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the song
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/:songId", songController.getSongById);

/**
 * @swagger
 * /songs/artist/:artist:
 *   get:
 *     summary: Get songs by artist
 *     description: Retrieve songs based on artist
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: artist
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the artist
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
router.get("/artist/:artist", songController.getSongsByArtist);

router.get("/album/:album", songController.getSongsByAlbum);
router.get("/genre/:genre", songController.getSongsByGenre);
// router.get("/year/:year", songController.getSongsByYear);

module.exports = router;
