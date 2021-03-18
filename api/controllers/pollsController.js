const { Poll } = require("../models");

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function createPoll(req, res) {
  const newPoll = req.body;
  console.log(newPoll);
  if (!newPoll.question) {
    return res.status(400).json({
      error: true,
      message: "Missing required field 'question'.",
    });
  }
  if (!newPoll.choices || newPoll.choices.length < 2) {
    return res.status(400).json({
      error: true,
      message: "Poll requires at least 2 choices.",
    });
  }
  newPoll.choices = newPoll.choices.map((choice) => ({ value: choice }));
  try {
    const poll = await Poll.create(newPoll);
    res.json(poll);
  } catch (err) {
    res.status(500).json(err);
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function updatePoll(req, res) {
  console.log(req.body);
  console.log(req.params);
  const { id } = req.params;
  const { vote } = req.body;
  if (!vote) {
    return res.status(400).json({
      error: true,
      message: "Invalid request. Missing 'vote' key or value.",
    });
  }
  try {
    const poll = await Poll.findByIdAndUpdate(
      id,
      {
        $inc: { "choices.$[elem].votes": 1 },
      },
      {
        new: true,
        arrayFilters: [
          {
            "elem._id": vote,
          },
        ],
      }
    );
    Poll.emit("vote", poll);
    res.json(poll);
  } catch (err) {
    res.status(500).json(err);
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getPolls(req, res) {
  try {
    const polls = await Poll.find({});
    res.json(polls);
  } catch (err) {
    res.status(500).json(err);
  }
}

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
async function getPoll(req, res) {
  const { id } = req.params;
  try {
    const poll = await Poll.findById(id);
    res.json(poll);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  createPoll,
  updatePoll,
  getPolls,
  getPoll,
};
