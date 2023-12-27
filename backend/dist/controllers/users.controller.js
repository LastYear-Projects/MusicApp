"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_service_1 = __importDefault(require("../services/users.service"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
/**
 * @swagger
/users/:
  get:
    summary: Get all users
    description: Retrieve a list of all users
    tags: [Users]
    responses:
      200:
        description: Successful response
        content:
          application/json:
            example:
              - name: John Doe
                email: john@example.com
                profile_image: https://example.com/john.jpg
              - name: Jane Doe
                email: jane@example.com
                profile_image: https://example.com/jane.jpg
      500:
        description: Internal Server Error

 */
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_service_1.default.getAllUsers();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/{userId}:
  get:
    summary: Get user by ID
    description: Retrieve a user based on their ID
    tags: [Users]
    parameters:
      - in: path
        name: userId
        schema:
          type: string
        required: true
        description: ID of the user
    responses:
      200:
        description: Successful response
        content:
          application/json:
            example:
              name: John Doe
              email: john@example.com
              profile_image: https://example.com/john.jpg
      500:
        description: Internal Server Error
 */
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_service_1.default.getUserById(req.params.userId);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const getUserByName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //TODO: LO MEANYEN
    try {
        const user = yield users_service_1.default.getUserByName(req.params.name);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/email/{email}:
  get:
    summary: Get user by email
    description: Retrieve a user based on their email
    tags: [Users]
    parameters:
      - in: path
        name: email
        schema:
          type: string
        required: true
        description: Email of the user
    responses:
      200:
        description: Successful response
        content:
          application/json:
            example:
              name: John Doe
              email: john@example.com
              profile_image: https://example.com/john.jpg
      500:
        description: Internal Server Error

 */
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_service_1.default.getUserByEmail(req.body.email);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
const list = [];
list.fin;
/**
 * @swagger
 * /users/user-details:
  post:
    summary: Get user details
    description: Retrieve details of the authenticated user
    tags: [Users]
    security:
      - BearerAuth: []
    responses:
      200:
        description: Successful response
        content:
          application/json:
            example:
              name: John Doe
              email: john@example.com
              profile_image: https://example.com/john.jpg
      401:
        description: Unauthorized
      500:
        description: Internal Server Error
 */
const getUserDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userId = decodedToken.id;
        const user = yield users_service_1.default.getUserById(userId);
        //delete password key from user object
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/:
  post:
    summary: Create a new user
    description: Create a new user with the provided information
    tags: [Users]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/User'
    responses:
      201:
        description: Successful response
        content:
          application/json:
            example:
              name: John Doe
              email: john@example.com
              profile_image: https://example.com/john.jpg
      500:
        description: Internal Server Error
 */
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = Object.assign({}, req.body);
        user.name = user.name
            .split(" ")
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
            .join(" ");
        user.email = user.email.toLowerCase();
        const createdUser = yield users_service_1.default.createUser(user);
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/{userId}:
  delete:
    summary: Delete user
    description: Delete user by ID
    tags: [Users]
    parameters:
      - in: path
        name: userId
        schema:
          type: string
        required: true
        description: ID of the user
    responses:
      200:
        description: Successful response
      500:
        description: Internal Server Error
 */
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_service_1.default.deleteUser(req.params.userId);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/:
  put:
    summary: Update user
    description: Update user details
    tags: [Users]
    security:
      - BearerAuth: []
    requestBody:
      required: true
      content:
        application/json:
          schema:
            $ref: '#/components/schemas/User'
    responses:
      200:
        description: Successful response
      401:
        description: Unauthorized
      500:
        description: Internal Server Error

 */
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userIdParams = req.params.userId;
        const { token, updatedUser } = req.body;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const userId = decodedToken.id;
        const user = yield users_service_1.default.getUserById(userId);
        if (updatedUser.name)
            updatedUser.name = updatedUser.name
                .split(" ")
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1).toLowerCase())
                .join(" ");
        if (updatedUser.email)
            updatedUser.email = updatedUser.email.toLowerCase();
        const userAfterUpdate = yield users_service_1.default.updateUser(userId, updatedUser);
        userAfterUpdate.password = undefined;
        res.status(200).json({ message: "User updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/songs/{id}:
  get:
    summary: Get user songs
    description: Retrieve songs associated with the user
    tags: [Users]
    parameters:
      - in: path
        name: id
        schema:
          type: string
        required: true
        description: ID of the user
    responses:
      200:
        description: Successful response
        content:
          application/json:
            example:
              - songId: abc123
                title: Song 1
              - songId: def456
                title: Song 2
      500:
        description: Internal Server Error

 */
const getUserSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_service_1.default.getUserSongs(req.params.id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/songs/{id}:
  post:
    summary: Add song to user
    description: Add a new song to the user's list
    tags: [Users]
    parameters:
      - in: path
        name: id
        schema:
          type: string
        required: true
        description: ID of the user
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              songId:
                type: string
                description: ID of the song to add
    responses:
      200:
        description: Successful response
      500:
        description: Internal Server Error
 */
const addSongToUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_service_1.default.addSongsToUser(req.params.id, req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/songs/{id}:
  delete:
    summary: Remove song from user
    description: Remove a song from the user's list
    tags: [Users]
    parameters:
      - in: path
        name: id
        schema:
          type: string
        required: true
        description: ID of the user
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              songId:
                type: string
                description: ID of the song to remove
    responses:
      200:
        description: Successful response
      500:
        description: Internal Server Error
 */
const removeSongFromUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_service_1.default.removeSongFromUser(req.params.id, req.body);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/login:
  post:
    summary: User login
    description: Authenticate user and generate JWT token
    tags: [Users]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              email:
                type: string
              password:
                type: string
    responses:
      200:
        description: Successful response
        content:
          application/json:
            example:
              token: abc123def456
      400:
        description: Invalid email or password
      500:
        description: Internal Server Error

 */
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_service_1.default.getUserByEmail(req.body.email.toLowerCase());
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        if (bcrypt_1.default.compareSync(req.body.password, user.password)) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });
        res.status(200).json({ token: token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/check-song/{userId}:
  post:
    summary: Check user's song
    description: Check a specific song for the user
    tags: [Users]
    parameters:
      - in: path
        name: userId
        schema:
          type: string
        required: true
        description: ID of the user
    security:
      - BearerAuth: []
    requestBody:
      required
         content:
        application/json:
          schema:
            type: object
            properties:
              token:
                type: string
              songId:
                type: string
    responses:
      200:
        description: Successful response
        content:
          application/json:
            example:
              isExist: true
      401:
        description: Unauthorized
      500:
        description: Internal Server Error
 */
const checkSong = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.body;
        const { songId } = req.params;
        const decodedToken = jsonwebtoken_1.default.decode(token);
        const user = yield users_service_1.default.getUserById(decodedToken.id);
        const song = user.songs.find((song) => song._id == songId);
        if (song) {
            res.status(200).json({ isExist: true });
        }
        else {
            res.status(200).json({ isExist: false });
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/google-login:
  post:
    summary: Google login
    description: Authenticate user using Google credentials and generate JWT token
    tags: [Users]
    requestBody:
      required: true
      content:
        application/json:
          schema:
            type: object
            properties:
              name:
                type: string
              email:
                type: string
              profile_image:
                type: string
    responses:
      200:
        description: Successful response
        content:
          application/json:
            example:
              token: abc123def456
      500:
        description: Internal Server Error
 */
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield users_service_1.default.getUserByEmail(req.body.email.toLowerCase());
        if (!user) {
            const newUser = {
                name: req.body.name,
                email: req.body.email.toLowerCase(),
                password: req.body.name + req.body.email.toLowerCase(),
                profile_image: req.body.profile_image,
            };
            const createdUser = yield users_service_1.default.createGoogleUser(newUser);
            if (!createdUser) {
                return res.status(500).json({ message: "Something went wrong" });
            }
            user = createdUser;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "365d",
        });
        return res.status(200).json({ token: token });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
/**
 * @swagger
 * /users/check-token:
  post:
    summary: Check JWT token
    description: Check if the provided JWT token is valid
    tags: [Users]
    responses:
      200:
        description: Successful response
        content:
          application/json:
            example:
              isValidToken: true
      500:
        description: Internal Server Error
 */
const checkToken = (req, res) => {
    return res.status(200).json({ isValidToken: true });
};
// const userController = {
//   getAllUsers,
//   getUserById,
//   getUserByName,
//   getUserByEmail,
//   getUserDetails,
//   createUser,
//   deleteUser,
//   updateUser,
//   getUserSongs,
//   addSongToUser,
//   removeSongFromUser,
//   userLogin,
//   checkSong,
//   googleLogin,
//   checkToken,
// };
exports.default = {
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
};
//# sourceMappingURL=users.controller.js.map