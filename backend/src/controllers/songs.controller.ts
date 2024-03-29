import songService from "../services/songs.service";
import userService from "../services/users.service";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Token from "../utils/tokenType";
const getAllSongs = async (req:Request, res:Response) => {
  try {
    const songs = await songService.getAllSongs();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getSongsByIds = async (req:Request, res:Response) => {
  try {
    const { ids } = req.body;
    const songs = await songService.getSongsByIds(ids);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSongsByArtist = async (req:Request, res:Response) => {
  try {
    const { artist } = req.params;
    const songs = await songService.getSongsByArtist(artist);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getSongsByAlbum = async (req:Request, res:Response) => {
  try {
    const { album } = req.params;
    const songs = await songService.getSongsByAlbum(album);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getSongsByGenre = async (req:Request, res:Response) => {
  try {
    const { genre } = req.params;
    const songs = await songService.getSongsByGenre(genre);
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// const getSongsByYear = async (req:Request, res:Response) => {
//   try {
//     const { year } = req.params;
//     const songs = await songService.getSongsByYear(year);
//     res.status(200).json(songs);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const getSongById = async (req:Request, res:Response) => {
  try {
    const id = req.params.songId;
    const song = await songService.getSongById(id);
    res.status(200).json(song);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createSong = async (req:Request, res:Response) => {
  try {
    const { song, token } = req.body;
    const genres = [...song.genre];
    const duration = song.duration;
    const price = song.price;
    const creator = jwt.decode(token) as Token ;
    const user = await userService.getUserById(creator.id);

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
    await userService.updateUser(creator.id, user);
    res.status(201).json(newSong);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const deleteSong = async (req:Request, res:Response) => {
  try {
    const id = req.params.songId;
    await songService.deleteSong(id);
    res.status(200).json({ message: "Song deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateSong = async (req:Request, res:Response) => {
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

export default {
  getAllSongs,
  getSongsByIds,
  createSong,
  deleteSong,
  updateSong,
  getSongById,
  getSongsByArtist,
  getSongsByAlbum,
  getSongsByGenre,
  // getSongsByYear,
};
