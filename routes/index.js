const router = require('express').Router();

const noteRouter = require('./notesRoute');

router.use('./notesRoute', noteRouter);

module.exports = router;