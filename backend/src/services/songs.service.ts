import Song,{ISong} from "../models/SongScheme";
import {ObjectId} from "mongoose"

const getAllSongs = async () => {
  try {
    return await Song.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getSongsByIds = async (ids:ObjectId[]) => { // need to check if this function really gets an array of ids
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

const getSongById = async (id:ObjectId) => {
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

const getSongsByArtist = async (artist:string) => {
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

const getSongsByAlbum = async (album:string) => {
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

const getSongsByGenre = async (genre:string[]) => {
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

const getSongsByYear = async (year:string) => { // year dosent exist on SongScheme
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

const createSong = async (song:ISong) => {
  const checkSong = await Song.findOne(song);
  if (checkSong) {
    throw new Error("Song already exists");
  } else {
    const newSong = new Song(song);

    return await newSong.save();
  }
};

const deleteSong = async (id:ObjectId) => {
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

const updateSong = async (id:ObjectId, newSong:ISong) => {
  if (id) {
    await Song.findOneAndUpdate({ _id: id }, newSong);
    return;
  }
  throw new Error("Id is required");
};

const increaseNumOfPurchases = async (id:ObjectId) => {
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

const getSongByCommentId = async (id:ObjectId) => {
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
  getSongsByYear,
  increaseNumOfPurchases,
  getSongByCommentId,
};
