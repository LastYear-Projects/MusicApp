import mongoose,{ObjectId} from "mongoose"


export interface ISong {
  title: string;
  artist: string;
  album: string;
  genre: string[];
  duration: number;
  album_image: string;
  comments: ObjectId[];
  creator: ObjectId;
  price: number;
  preview_url: string;
  youtube_id: string;
  numOfPurchases: number;
}


const SongScheme = new mongoose.Schema<ISong>({
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

const Song= mongoose.model<ISong>("song", SongScheme, "songs");
export default Song
