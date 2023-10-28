const router = require('express').Router();

const noteRouter = require('./notesRoute');

router.use('./noteRoute', noteRouter);

module.exports = router;