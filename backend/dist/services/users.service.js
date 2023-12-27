"use strict";
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         email:
 *           type: string
 *           description: The user's email
 *         password:
 *           type: string
 *           description: The user's password
 *         profile_image:
 *           type: string
 *           description: The URL to the user's profile image
 *         orders:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of order IDs associated with the user
 *         songs:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of song IDs associated with the user
 */
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
const UserScheme_1 = __importDefault(require("../models/UserScheme"));
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users.
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/models/UserScheme'
 */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield UserScheme_1.default.find();
});
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     description: Retrieve a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/UserScheme'
 *       404:
 *         description: User not found
 */
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const user = yield UserScheme_1.default.findById(id).select("-password").populate({
                path: "songs",
                model: "song",
            });
            if (user) {
                return user;
            }
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Id is required");
});
/**
 * @swagger
 * /users/by-name/{name}:
 *   get:
 *     summary: Get a user by name
 *     description: Retrieve a user by their name.
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: User name
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/UserScheme'
 *       404:
 *         description: User not found
 */
const getUserByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    if (name) {
        try {
            const user = yield UserScheme_1.default.findOne({ name });
            if (user) {
                return user;
            }
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Name is required");
});
/**
 * @swagger
 * /users/by-email/{email}:
 *   get:
 *     summary: Get a user by email
 *     description: Retrieve a user by their email.
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User email
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/UserScheme'
 *       404:
 *         description: User not found
 */
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        try {
            const user = yield UserScheme_1.default.findOne({ email });
            if (user) {
                return user;
            }
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Email is required");
});
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/models/UserScheme'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/UserScheme'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user) {
        try {
            const { name, email, password } = user;
            if (!name || !email || !password) {
                throw new Error("Name, email and password are required");
            }
            if (yield getUserByEmail(email)) {
                throw new Error("Email already exists");
            }
            //const id = (email+name).replace(/\s/g, '_');
            const newUser = new UserScheme_1.default(Object.assign({}, user));
            yield newUser.save();
            return newUser;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("User is required");
});
/**
 * @swagger
 * /users/google-login:
 *   post:
 *     summary: Log in with Google
 *     description: Log in a user with Google credentials.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *               email:
 *                 type: string
 *                 description: The user's email
 *               profile_image:
 *                 type: string
 *                 description: The URL to the user's profile image
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Google login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/UserScheme'
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */
const createGoogleUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    if (user) {
        try {
            const { name, email, profile_image } = user;
            user["password"] = name + email;
            if (!name || !email) {
                throw new Error("Name and email are required");
            }
            const newUser = new UserScheme_1.default(Object.assign({}, user));
            yield newUser.save();
            return newUser;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
});
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Delete a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request parameter
 *       500:
 *         description: Internal server error
 */
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const user = yield UserScheme_1.default.findByIdAndDelete(id);
            if (user) {
                return user;
            }
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Id is required");
});
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user by ID
 *     description: Update a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to update.
 *         schema:
 *           type: string
 *       - in: body
 *         name: newUser
 *         required: true
 *         description: The updated user object.
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request parameter
 *       500:
 *         description: Internal server error
 */
const updateUser = (id, newUser) => __awaiter(void 0, void 0, void 0, function* () {
    if (id && newUser) {
        try {
            yield UserScheme_1.default.findOneAndUpdate({ _id: id }, newUser);
            return newUser;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    throw new Error("Id and new user are required");
});
/**
 * @swagger
 * /users/{id}/orders:
 *   post:
 *     summary: Add order to user
 *     description: Add an order to a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to add the order to.
 *         schema:
 *           type: string
 *       - in: body
 *         name: orderID
 *         required: true
 *         description: The ID of the order to add.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *       400:
 *         description: Invalid request parameter
 *       500:
 *         description: Internal server error
 */
const addOrderToUser = (id, orderID) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const user = yield UserScheme_1.default.findById(id);
            if (user) {
                user.orders.push(orderID);
                updateUser(id, user);
                return orderID;
            }
            return null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
});
/**
 * @swagger
 * /users/{id}/songs:
 *   post:
 *     summary: Add songs to user
 *     description: Add songs to a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the user to add songs to.
 *         schema:
 *           type: string
 *       - in: body
 *         name: songs
 *         required: true
 *         description: List of song IDs to add.
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *     responses:
 *       200:
 *         description: Songs added successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid request parameter
 *       500:
 *         description: Internal server error
 */
const addSongsToUser = (id, songs) => __awaiter(void 0, void 0, void 0, function* () {
    if (id) {
        try {
            const user = yield UserScheme_1.default.findById(id);
            if (user) {
                for (let i = 0; i < songs.length; i++) {
                    user.songs.push(songs[i]);
                }
                yield updateUser(id, user);
                return user;
            }
            throw new Error("User not found");
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
});
exports.default = {
    addOrderToUser,
    addSongsToUser,
    getAllUsers,
    getUserById,
    getUserByName,
    getUserByEmail,
    createUser,
    deleteUser,
    updateUser,
    createGoogleUser,
};
//# sourceMappingURL=users.service.js.map