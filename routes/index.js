const router = require('express').Router();

const noteRouter = require('./notesRoute');

router.use("/notes", noteRouter);

module.exports = router;