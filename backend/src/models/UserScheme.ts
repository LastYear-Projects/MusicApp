import mongoose,{Types} from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  songs?: Types.ObjectId[];
  profile_image: string;
  refreshTokens?: string[];
}

const UserScheme = new mongoose.Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 500,
  },
  songs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "song",
    default: [],
  },

  profile_image: {
    type: String,
    trim: true,
    default: "https://www.freeiconspng.com/uploads/no-image-icon-4.png",
  },
  refreshTokens: {
    type: [String],
    default: [],
  },
});

const User = mongoose.model<IUser>("user", UserScheme, "users");
export default User
