import mongoose from "mongoose"


export type IUser = mongoose.Document & {
  name: string;
  email: string;
  password: string;
  songs?: mongoose.Types.ObjectId[];
  profile_image?: string;
};

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *         songs:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of song IDs associated with the user
 *         profile_image:
 *           type: string
 *           description: The URL of the profile image for the user
 */

const UserScheme = new mongoose.Schema({
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
});

const User = mongoose.model<IUser>("user", UserScheme);

export default User;
