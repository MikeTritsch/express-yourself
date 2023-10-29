// Separated/dedicated notes route, establishing Router, using the UUID package, and helper functions
const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('../helpers/fsUtils');

// GET ALL NOTES //
notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// GETS SINGLE NOTE //
notes.get('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

// DELETES NOTE //
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {

      const result = json.filter((note) => note.id !== noteId);

      writeToFile('./db/db.json', result);

      res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

// CREATE NOTE //
notes.post('/', (req, res) => {

  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
});

// EXPORTS //
module.exports = notes;
