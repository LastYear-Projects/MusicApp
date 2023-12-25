/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: API endpoints for managing songs
 */

const songService = require("../services/songs.service");
const userService = require("../services/users.service");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * /songs:
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
const getAllSongs = async (req, res) => {
  try {
    const songs = await songService.getAllSongs();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /songs/get-songs:
 *   post:
 *     summary: Get songs by IDs
 *     description: Retrieve a list of songs by their IDs
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - ids
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const getSongsByIds = async (req, res) => {
  try {
    const { ids } = req.body;
    const songs = await songService.getSongsByIds(ids);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /songs/artist/{artist}:
 *   get:
 *     summary: Get songs by artist
 *     description: Retrieve a list of songs by a specific artist
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
const getSongsByArtist = async (req, res) => {
  try {
    const { artist } = req.params;
    const songs = await songService.getSongsByArtist(artist);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /songs/album/{album}:
 *   get:
 *     summary: Get songs by album
 *     description: Retrieve a list of songs from a specific album
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: album
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the album
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const getSongsByAlbum = async (req, res) => {
  try {
    const { album } = req.params;
    const songs = await songService.getSongsByAlbum(album);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /songs/genre/{genre}:
 *   get:
 *     summary: Get songs by genre
 *     description: Retrieve a list of songs from a specific genre
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: genre
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the genre
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const getSongsByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    const songs = await songService.getSongsByGenre(genre);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /songs/year/{year}:
 *   get:
 *     summary: Get songs by year
 *     description: Retrieve a list of songs from a specific year
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: year
 *
 *         schema:
 *           type: string
 *         required: true
 *         description: Release year of the songs
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const getSongsByYear = async (req, res) => {
  try {
    const { year } = req.params;
    const songs = await songService.getSongsByYear(year);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /songs/{songId}:
 *   get:
 *     summary: Get a song by ID
 *     description: Retrieve detailed information about a specific song by its ID
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
const getSongById = async (req, res) => {
  try {
    const id = req.params.songId;
    const song = await songService.getSongById(id);
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /songs/create:
 *   post:
 *     summary: Create a new song
 *     description: Create a new song with the provided details
 *     tags: [Songs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               song:
 *                 type: object
 *             required:
 *               - song
 *     responses:
 *       201:
 *         description: Successful response
 *       409:
 *         description: Conflict - Song creation failed
 */
const createSong = async (req, res) => {
  try {
    const { song, token } = req.body;
    const genres = [...song.genre];
    const duration = song.duration;
    const price = song.price;
    const creatorID = jwt.decode(token).id;
    const user = await userService.getUserById(creatorID);

    // Check with regex that the price doesn't contain letters (point is allowed)
    const reg = new RegExp("^[0-9]+(.[0-9]+)?");
    if (price && !reg.test(price)) {
      return res.status(500).json({ message: "Price must be a number" });
    }
    if (price && price < 0) {
      return res.status(500).json({ message: "Price cannot be negative" });
    }
    if (duration && duration < 0) {
      return res.status(500).json({ message: "Duration cannot be negative" });
    }

    const titleCaseGenres = genres.map((genre) => {
      let myGenre = genre.split(" ");
      myGenre = myGenre.map((word) => word[0].toUpperCase() + word.slice(1));
      myGenre = myGenre.join("-");
      myGenre = myGenre.split("-");
      myGenre = myGenre.map((word) => word[0].toUpperCase() + word.slice(1));
      return myGenre.join("-");
    });

    song.genre = titleCaseGenres;
    song.creator = user._id;

    const newSong = await songService.createSong(song);
    user.songs.push(newSong._id);
    await userService.updateUser(creatorID, user);
    res.status(201).json(newSong);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

/**
 * @swagger
 * /songs/{songId}:
 *   delete:
 *     summary: Delete a song by ID
 *     description: Delete a specific song by its ID
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
const deleteSong = async (req, res) => {
  try {
    const id = req.params.songId;
    await songService.deleteSong(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @swagger
 * /songs/{songId}:
 *   put:
 *     summary: Update a song by ID
 *     description: Update details of a specific song by its ID
 *     tags: [Songs]
 *     parameters:
 *       - in: path
 *         name: songId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the song
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               updatedSong:
 *                 type: object
 *             required:
 *               - updatedSong
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */
const updateSong = async (req, res) => {
  try {
    const id = req.params.songId;
    const { updatedSong } = req.body;
    const duration = updatedSong.duration;
    const price = updatedSong.price;

    // Check if price contains letters
    const reg = new RegExp("^[0-9]+(.[0-9]+)?");
    if (price < 0) {
      return res.status(500).json({ message: "Price cannot be negative" });
    }
    if (!reg.test(price)) {
      return res.status(500).json({ message: "Price must be a number" });
    }
    if (duration < 0) {
      return res.status(500).json({ message: "Duration cannot be negative" });
    }

    await songService.updateSong(id, updatedSong);
    res.status(200).json({ message: "Song updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllSongs,
  getSongsByIds,
  createSong,
  deleteSong,
  updateSong,
  getSongById,
  getSongsByArtist,
  getSongsByAlbum,
  getSongsByGenre,
  getSongsByYear,
};
