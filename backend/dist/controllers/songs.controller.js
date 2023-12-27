"use strict";
/**
 * @swagger
 * tags:
 *   name: Songs
 *   description: API endpoints for managing songs
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const songs_service_1 = __importDefault(require("../services/songs.service"));
const users_service_1 = __importDefault(require("../services/users.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
const getAllSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield songs_service_1.default.getAllSongs();
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const getSongsByIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ids } = req.body;
        const songs = yield songs_service_1.default.getSongsByIds(ids);
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const getSongsByArtist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { artist } = req.params;
        const songs = yield songs_service_1.default.getSongsByArtist(artist);
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const getSongsByAlbum = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { album } = req.params;
        const songs = yield songs_service_1.default.getSongsByAlbum(album);
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const getSongsByGenre = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre } = req.params;
        const songs = yield songs_service_1.default.getSongsByGenre(genre);
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const getSongsByYear = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { year } = req.params;
        const songs = yield songs_service_1.default.getSongsByYear(year);
        res.status(200).json(songs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const getSongById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.songId;
        const song = yield songs_service_1.default.getSongById(id);
        res.status(200).json(song);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const createSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { song, token } = req.body;
        const genres = [...song.genre];
        const duration = song.duration;
        const price = song.price;
        const creatorID = jsonwebtoken_1.default.decode(token).id;
        const user = yield users_service_1.default.getUserById(creatorID);
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
        const newSong = yield songs_service_1.default.createSong(song);
        user.songs.push(newSong._id);
        yield users_service_1.default.updateUser(creatorID, user);
        res.status(201).json(newSong);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
});
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
const deleteSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.songId;
        yield songs_service_1.default.deleteSong(id);
        res.status(200).json({ message: "Song deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
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
const updateSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        yield songs_service_1.default.updateSong(id, updatedSong);
        res.status(200).json({ message: "Song updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.default = {
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
//# sourceMappingURL=songs.controller.js.map