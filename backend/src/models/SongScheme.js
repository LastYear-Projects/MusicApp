const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *   schemas:
 *     Song:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the song
 *         artist:
 *           type: string
 *           description: The artist of the song
 *         album:
 *           type: string
 *           description: The album of the song
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of genres associated with the song
 *         duration:
 *           type: number
 *           description: The duration of the song in seconds
 *         album_image:
 *           type: string
 *           description: The URL of the album image for the song
 *         comments:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of comment IDs associated with the song
 *         creator:
 *           type: string
 *           description: The ID of the user who created the song
 *         price:
 *           type: number
 *           description: The price of the song
 *         preview_url:
 *           type: string
 *           description: The URL for a preview of the song
 *         youtube_id:
 *           type: string
 *           description: The YouTube ID associated with the song
 *         numOfPurchases:
 *           type: number
 *           description: The number of purchases made for the song
 */
const SongScheme = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  artist: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  album: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  genre: {
    type: [String],
    trim: true,
    minlength: 3,
    maxlength: 50,
    default: [],
    validate: [(val) => val.length > 0, "Must have minimum one option"],
  },
  duration: {
    type: Number,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 5, //TODO: check if this is the right max length
  },
  album_image: {
    type: String,
    trim: true,
    default: "https://www.freeiconspng.com/uploads/no-image-icon-4.png",
  },
  comments: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  price: {
    type: Number,
    trim: true,
    minlength: 1,
    maxlength: 5,
    default: 19.99,
    min: 0,
  },
  preview_url: {
    type: String,
    trim: true,
    maxlength: 500,
    default: "",
  },
  youtube_id: {
    type: String,
    trim: true,
    default: "",
  },
  numOfPurchases: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("song", SongScheme, "songs");
