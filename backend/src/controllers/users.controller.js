const userService = require("../services/users.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByName = async (req, res) => {
  //TODO: LO MEANYEN
  try {
    const user = await userService.getUserByName(req.params.name);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await userService.getUserByEmail(req.body.email);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const list = [];
list.fin;

const getUserDetails = async (req, res) => {
  try {
    const { token } = req.body;
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;
    const user = await userService.getUserById(userId);
    //delete password key from user object
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = { ...req.body };
    user.name = user.name
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
      .join(" ");
    salt = bcrypt.genSaltSync(10);
    user.email = user.email.toLowerCase();
    user.password = bcrypt.hashSync(user.password, salt);
    const createdUser = await userService.createUser(user);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.userId);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userIdParams = req.params.userId;
    const { token, updatedUser } = req.body;
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;
    const user = await userService.getUserById(userId);
    if (updatedUser.name)
      updatedUser.name = updatedUser.name
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
        .join(" ");
    if (updatedUser.email) updatedUser.email = updatedUser.email.toLowerCase();
    const userAfterUpdate = await userService.updateUser(userId, updatedUser);
    userAfterUpdate.password = undefined;
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserSongs = async (req, res) => {
  try {
    const user = await userService.getUserSongs(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addSongToUser = async (req, res) => {
  try {
    const user = await userService.addSongsToUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeSongFromUser = async (req, res) => {
  try {
    const user = await userService.removeSongFromUser(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const userLogin = async (req, res) => {
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
    userService.addRefreshToken(user._id, refreshToken);
    res.status(200).json({ token: token, refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkSong = async (req, res) => {
  try {
    const { token } = req.body;
    const { songId } = req.params;
    const decodedToken = jwt.decode(token);
    const user = await userService.getUserById(decodedToken.id);
    const song = user.songs.find((song) => song._id == songId);
    if (song) {
      res.status(200).json({ isExist: true });
    } else {
      res.status(200).json({ isExist: false });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const googleLogin = async (req, res) => {
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
    return res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkToken = (req, res) => {
  return res.status(200).json({ isValidToken: true });
};

const isRefreshTokenExist = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decodedToken = jwt.decode(refreshToken);
    const user = await userService.getUserById(decodedToken.id);
    if (!user) {
      return res.status(403).json({ message: "Invalid token" });
    }
    const isTokenExist = user.refreshTokens.find(
      (token) => token === refreshToken
    );
    if (!isTokenExist) {
      await userService.removeRefreshTokens(user._id);
      return res.status(403).json({ message: "Invalid token" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const verifyRefreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;
  const decodedToken = jwt.decode(refreshToken);
  const user = await userService.getUserById(decodedToken.id);
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err) => {
    if (err) {
      //refreshToken is valid!! but expired
      userService.removeRefreshToken(user._id, refreshToken);
      const newRefreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_TIME,
        }
      );
      userService.addRefreshToken(user._id, newRefreshToken);
      req.body.refreshToken = newRefreshToken;
    }
    next();
  });
};

const generateAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decodedToken = jwt.decode(refreshToken);
    const user = await userService.getUserById(decodedToken.id);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION_TIME,
    });
    res.status(200).json({ token: token, refreshToken: refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    const decodedToken = jwt.decode(token);
    const userId = decodedToken.id;
    await userService.removeRefreshToken(userId, refreshToken);
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  getUserDetails,
  createUser,
  deleteUser,
  updateUser,
  getUserSongs,
  addSongToUser,
  removeSongFromUser,
  userLogin,
  checkSong,
  googleLogin,
  checkToken,
  isRefreshTokenExist,
  verifyRefreshToken,
  generateAccessToken,
  logout
};
