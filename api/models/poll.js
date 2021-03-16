const mongoose = require("mongoose");
const { Schema } = mongoose;

const pollSchema = new Schema({
  question: {
    type: String,
  },
  choices: {
    type: [
      {
        value: String,
        votes: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Poll = mongoose.model("Poll", pollSchema);

module.exports = Poll;
