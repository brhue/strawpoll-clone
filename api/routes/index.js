const { Router } = require("express");
const router = Router();

const pollRoutes = require("./poll");

router.use("/poll", pollRoutes);

module.exports = router;
