import mongoose from "mongoose";
import Song from "../models/SongScheme"

/**
 * @swagger
 * /songs:
 *   get:
 *     summary: Get all songs
 *     description: Returns a list of all songs.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}]
 */
const getAllSongs = async () => {
  try {
    return await Song.find();
  } catch (error) {
    throw new Error(error.message);
  }
};
/**
 * @swagger
 * /songs/ids:
 *   post:
 *     summary: Get songs by IDs
 *     description: Returns a list of songs by IDs.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"ids": [1, 2, 3]}
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}]
 */
const getSongsByIds = async (ids) => {
  if (ids) {
    try {
      const songs = await Song.find({ _id: { $in: ids } });
      if (songs) {
        return songs;
      }
      throw new Error("Songs not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Ids are required");
};

/**
 * @swagger
 * /songs/{id}:
 *   get:
 *     summary: Get song by ID
 *     description: Returns a song by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the song
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}
 */
const getSongById = async (id) => {
  if (id) {
    try {
      const song = await Song.findById(id);
      if (song) {
        return song;
      }
      throw new Error("Song not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Id is required");
};
/**
 * @swagger
 * /songs/artist/{artist}:
 *   get:
 *     summary: Get songs by artist
 *     description: Returns a list of songs by artist.
 *     parameters:
 *       - in: path
 *         name: artist
 *         required: true
 *         description: Artist name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}]
 */
const getSongsByArtist = async (artist) => {
  if (artist) {
    try {
      const songs = await Song.find({ artist });
      if (songs) {
        return songs;
      }
      throw new Error("Artist not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Artist is required");
};
/**
 * @swagger
 * /songs/album/{album}:
 *   get:
 *     summary: Get songs by album
 *     description: Returns a list of songs by album.
 *     parameters:
 *       - in: path
 *         name: album
 *         required: true
 *         description: Album name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}]
 */
const getSongsByAlbum = async (album) => {
  if (album) {
    try {
      const songs = await Song.find({ album });
      if (songs) {
        return songs;
      }
      throw new Error("Album not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Album is required");
};
/**
 * @swagger
 * /songs/genre/{genre}:
 *   get:
 *     summary: Get songs by genre
 *     description: Returns a list of songs by genre.
 *     parameters:
 *       - in: path
 *         name: genre
 *         required: true
 *         description: Genre name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}]
 */
const getSongsByGenre = async (genre) => {
  if (genre) {
    try {
      const songs = await Song.find({ genre });
      if (songs) {
        return songs;
      }
      throw new Error("Genre not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Genre is required");
};
/**
 * @swagger
 * /songs/year/{year}:
 *   get:
 *     summary: Get songs by year
 *     description: Returns a list of songs by year.
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         description: Release year
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: [{"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}]
 */
const getSongsByYear = async (year) => {
  if (year) {
    try {
      const songs = await Song.find({ year });
      if (songs) {
        return songs;
      }
      throw new Error("Year not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Year is required");
};

/**
 * @swagger
 * /songs:
 *   post:
 *     summary: Create a new song
 *     description: Creates a new song.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}
 *     responses:
 *       201:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}
 */
const createSong = async (song) => {
  const checkSong = await Song.findOne(song);
  if (checkSong) {
    throw new Error("Song already exists");
  } else {
    const newSong = new Song(song);

    return await newSong.save();
  }
};
/**
 * @swagger
 * /songs/{id}:
 *   delete:
 *     summary: Delete a song by ID
 *     description: Deletes a song by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the song
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}
 */
const deleteSong = async (id) => {
  if (id) {
    try {
      const song = await Song.findById(id);
      if (!song) {
        throw new Error("Song not found");
      }
      await Song.findByIdAndDelete(id);
      return;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Id is required");
};
/**
 * @swagger
 * /songs/{id}:
 *   put:
 *     summary: Update a song by ID
 *     description: Updates a song by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the song
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example: {"title": "Updated Title", "artist": "Updated Artist", "album": "Updated Album", "year": 2023, "genre": "Updated Genre", "numOfPurchases": 10}
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "title": "Updated Title", "artist": "Updated Artist", "album": "Updated Album", "year": 2023, "genre": "Updated Genre", "numOfPurchases": 10}
 */
const updateSong = async (id, newSong) => {
  if (id) {
    await Song.findOneAndUpdate({ _id: id }, newSong);
    return;
  }
  throw new Error("Id is required");
};
/**
 * @swagger
 * /songs/increase-purchases/{id}:
 *   put:
 *     summary: Increase the number of purchases for a song
 *     description: Increases the number of purchases for a song by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the song
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 1}
 */
const increaseNumOfPurchases = async (id: mongoose.ObjectId) => {
  if (id) {
    try {
      const song = await Song.findById(id);
      if (song) {
        song.numOfPurchases++;
        updateSong(id, song);
        return;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Id is required");
};
/**
 * @swagger
 * /songs/comment/{id}:
 *   get:
 *     summary: Get song by comment ID
 *     description: Returns a song by comment ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the comment
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {"id": 1, "title": "Song Title", "artist": "Artist Name", "album": "Album Name", "year": 2022, "genre": "Genre", "numOfPurchases": 0}
 */
const getSongByCommentId = async (id: mongoose.ObjectId) => {
  if (id) {
    try {
      const song = await Song.findOne({ comments: id });
      if (song) {
        return song;
      }
      throw new Error("Song not found");
    } catch (error) {
      throw new Error(error.message);
    }
  }
  throw new Error("Id is required");
};

export default  {
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
  increaseNumOfPurchases,
  getSongByCommentId,
};
