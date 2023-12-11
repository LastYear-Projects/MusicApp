const Song = require('../models/SongScheme');
const getToken = require('../config/spotifyApi');


const getAllSongs = async () => {
    try {
        return await Song.find();
    }
    catch (error) {
        throw new Error(error.message)
    }
}

const getSongsByIds = async (ids) => {
    if (ids) {
        try {
            const songs = await Song.find({ _id: { $in: ids } });
            if (songs) {
                return songs;
            }
            throw new Error('Songs not found');
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
    throw new Error('Ids are required');
}


const getSongById = async (id) => {
    if (id) {
        try {
            const song = await Song.findById(id);
            if (song) {
                return song;
            }
            throw new Error('Song not found');
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
    throw new Error('Id is required');
}

const getSongsByArtist = async (artist) => {
    if (artist) {
        try {
            const songs = await Song.find({ artist });
            if (songs) {
                return songs;
            }
            throw new Error('Artist not found');
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
    throw new Error('Artist is required');
}

const getSongsByAlbum = async (album) => {

    if (album) {
        try {
            const songs = await Song.find({ album });
            if (songs) {
                return songs;
            }
            throw new Error('Album not found');
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
    throw new Error('Album is required');
}

const getSongsByGenre = async (genre) => {
    if (genre) {
        try {
            const songs = await Song.find({ genre });
            if (songs) {
                return songs;
            }
            throw new Error('Genre not found');
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
    throw new Error('Genre is required');
}

const getSongsByYear = async (year) => {
    if (year) {
        try {
            const songs = await Song.find({ year });
            if (songs) {
                return songs;
            }
            throw new Error('Year not found');
        }
        catch (error) {
            throw new Error(error.message)
        }
    }
    throw new Error('Year is required');
}


const createSong = async (song) => {
    //create song and return it

    const { title, artist, album, year, duration, price, album_image, preview_url, youtube_id } = song;
    if (!title || !artist || !album || year === undefined || duration === undefined || youtube_id === undefined) {
        throw new Error('All fields are required');
    }
    //let id = title + artist + album + year;
    //id = id.replace(/\s+/g, '_');

    const checkSong = await Song.findOne(song);
    if (checkSong) {
        throw new Error('Song already exists');
    }
    else {
        const newSong = new Song(song);

        return await newSong.save();
    }


}

const deleteSong = async (id) => {
    //delete song by id
    //if the song doesn't exist, throw an error
    if (id) {
        try {
            const song = await Song.findById(id);
            if (!song) {
                throw new Error('Song not found');
            }
            await Song.findByIdAndDelete(id);
            return;

        } catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error('Id is required');
}

const updateSong = async (id, newSong) => {
    if (id) {
        const { title, artist, album, year, genre, duration, youtube_id } = newSong;
        if (!title || !artist || !album || year === undefined || !genre || duration === undefined || youtube_id === undefined) {
            throw new Error('All fields are required');
        }
        await Song.findOneAndUpdate({ _id: id }, newSong);
        return;
    }
    throw new Error('Id is required');
}

const increaseNumOfPurchases = async (id) => {
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
    throw new Error('Id is required');
}


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
    increaseNumOfPurchases
}