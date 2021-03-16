const { Router } = require("express");
const router = Router();

const pollsController = require("../controllers/pollsController");

router.get("/", pollsController.getPolls);
router.post("/", pollsController.createPoll);
router.get("/:id", pollsController.getPoll);
router.put("/:id", pollsController.updatePoll);

module.exports = router;
