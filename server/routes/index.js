const express = require("express");
const router = express.Router();

const movieRouter = require('./movieRoutes')

router.use('/movies', movieRouter)

module.exports = router;