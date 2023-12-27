"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    songs: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "song",
            required: true,
        },
    ],
    date: {
        type: Date,
        default: function () {
            const now = new Date();
            now.setHours(now.getHours() + 3);
            return now;
        },
    },
});
const Order = mongoose_1.default.model("order", OrderSchema);
exports.default = Order;
//# sourceMappingURL=OrderSchema.js.map