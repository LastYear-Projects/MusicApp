"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentScheme = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
    },
    date: {
        type: Date,
        default: function () {
            const now = new Date();
            now.setHours(now.getHours() + 3);
            return now;
        },
    },
});
exports.default = mongoose_1.default.model("comment", CommentScheme);
//# sourceMappingURL=CommentScheme.js.map