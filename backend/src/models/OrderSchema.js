const mongoose = require("mongoose");
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user placing the order
 *         songs:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of song IDs included in the order
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date and time when the order was created
 */

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("order", OrderSchema, "orders");
