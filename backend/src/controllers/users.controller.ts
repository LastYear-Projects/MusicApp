import axios from 'axios';
import userService from "../services/users.service";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response,NextFunction } from "express";
import Token from "../utils/tokenType";
import { IUser } from "../models/UserScheme";

const getAllUsers = async (req:Request, res:Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req:Request, res:Response) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByName = async (req:Request, res:Response) => {

  try {
    const user = await userService.getUserByName(req.params.name);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req:Request, res:Response) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserDetails = async (req:Request, res:Response) => {
  try {
    const { token } = req.body;
    const decodedToken = jwt.decode(token);
    const tokenObject = decodedToken as Token;
    const user = await userService.getUserById(tokenObject.id);
    //delete password key from user object
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req:Request, res:Response) => {
  try {
    const user = { ...req.body };
    user.name = user.name
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
      .join(" ");
    const salt = bcrypt.genSaltSync(10); // I ADDED CONST ?
    user.email = user.email.toLowerCase();
    user.password = bcrypt.hashSync(user.password, salt);
    const createdUser = await userService.createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req:Request, res:Response) => {
  try {
    const user = await userService.deleteUser(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req:Request, res:Response) => {
  try {
    const userIdParams = req.params.userId;
    const { token, updatedUser } = req.body;
    const decodedToken = jwt.decode(token);
    const tokenObject = decodedToken as Token;
    const user = await userService.getUserById(tokenObject.id);
    if (updatedUser.name)
      updatedUser.name = updatedUser.name
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
        .join(" ");
    if (updatedUser.email) updatedUser.email = updatedUser.email.toLowerCase();
    const userAfterUpdate = await userService.updateUser(tokenObject.id, updatedUser);
    userAfterUpdate.password = undefined;
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const getUserSongs = async (req:Request, res:Response) => {
//   try {
//     const user = await userService.getUserSongs(req.params.id);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

const addSongToUser = async (req:Request, res:Response) => {
  try {
    const user = await userService.addSongsToUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// const removeSongFromUser = async (req:Request, res:Response) => {
//   try {
//     const user = await userService.removeSongFromUser(req.params.id, req.body);
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const userLogin = async (req:Request, res:Response) => {
  try {
    const user = await userService.getUserByEmail(req.body.email.toLowerCase());
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    });
    userService.addRefreshToken(user._id.toString(), refreshToken);
    res.status(200).json({ token: token, refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkSong = async (req:Request, res:Response) => {
  try {
    const { token } = req.body;
    const { songId } = req.params;
    const decodedToken = jwt.decode(token) as Token;
    const user = await userService.getUserById(decodedToken.id);
    const song = user.songs.find((song) => song._id.toString() == songId);
    if (song) {
      res.status(200).json({ isExist: true });
    } else {
      res.status(200).json({ isExist: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const googleLogin = async (req:Request, res:Response) => {
  try {
    let user = await userService.getUserByEmail(req.body.email.toLowerCase());
    if (!user) {
      const newUser = {
        name: req.body.name,
        email: req.body.email.toLowerCase(),
        password: req.body.name + req.body.email.toLowerCase(),
        profile_image: req.body.profile_image,
      };
      const createdUser = await userService.createGoogleUser(newUser);
      if (!createdUser) {
        return res.status(500).json({ message: "Something went wrong" });
      }
      user = createdUser;
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    });
    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
    });

    return res.status(200).json({ token,refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkToken = (req:Request, res:Response) => {
  return res.status(200).json({ isValidToken: true });
};

const isRefreshTokenExist = async (req:Request, res:Response,next:NextFunction) => { 
  try {
    const { refreshToken } = req.body;
    const decodedToken = jwt.decode(refreshToken) as Token;
    const user = await userService.getUserById(decodedToken.id);
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const isTokenExist = user.refreshTokens.find(
      (token) => token === refreshToken
    );
    if (!isTokenExist) {
      await userService.removeRefreshTokens(user._id.toString());
      return res.status(403).json({ message: "Invalid token" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const verifyRefreshToken = async (req:Request, res:Response, next:NextFunction) => {
  const { refreshToken } = req.body;
  const decodedToken = jwt.decode(refreshToken) as Token;
  const user = await userService.getUserById(decodedToken.id);
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err:Error) => {
    if (err) {
      //refreshToken is valid!! but expired
      userService.removeRefreshToken(user._id.toString(), refreshToken);
      const newRefreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        }
      );
      userService.addRefreshToken(user._id.toString(), newRefreshToken);
      req.body.refreshToken = newRefreshToken;
    }
    next();
  });
};

const generateAccessToken = async (req:Request, res:Response) => {
  try {
    const { refreshToken } = req.body;
    const decodedToken = jwt.decode(refreshToken) as Token;
    const user = await userService.getUserById(decodedToken.id);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    });
    res.status(200).json({ token: token, refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 // token??
const logout = async (req:Request, res:Response) => {
  try {
    const { refreshToken } = req.body;
    const decodedToken = jwt.decode(refreshToken) as Token;
    const userId = decodedToken.id;
    await userService.removeRefreshToken(userId, refreshToken);
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const chatRegister =async (req:Request, res:Response)=>{
  const { username, secret, email, first_name, last_name } = req.body;

  // console.log("Write user into DB.");
  // return res.json({ user: {} });

  // Store a user-copy on Chat Engine!
  try {
    const r = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      { headers: { "Private-Key": "aeb4d2b7-9570-4432-bc80-36787f32800f" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
}

const chatLogin=async (req:Request, res:Response)=>{
  const { username, secret } = req.body;

  // console.log("Fetch user from DB.");
  // return res.json({ user: {} });

  // Fetch this user from Chat Engine in this project!
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": "0065a0fd-6a45-4e13-bb94-ddd7556671aa",
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
}
export default {
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  getUserDetails,
  createUser,
  deleteUser,
  updateUser,
  //getUserSongs,
  addSongToUser,
 // removeSongFromUser,
  userLogin,
  checkSong,
  googleLogin,
  checkToken,
  isRefreshTokenExist,
  verifyRefreshToken,
  generateAccessToken,
  logout,
  chatLogin,
chatRegister,
};
