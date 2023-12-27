"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
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
const UserScheme = new mongoose_1.default.Schema({
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
        type: [mongoose_1.default.Schema.Types.ObjectId],
        ref: "song",
        default: [],
    },
    profile_image: {
        type: String,
        trim: true,
        default: "https://www.freeiconspng.com/uploads/no-image-icon-4.png",
    },
});
const User = mongoose_1.default.model("user", UserScheme);
exports.default = User;
//# sourceMappingURL=UserScheme.js.map