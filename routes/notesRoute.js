const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


notes.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

notes.get('/:note_id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile(note)
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result =  json.filter((note) => note.note_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('No note with that ID');
    });
});

notes.post('/', (req, res) => {
  console.log(req.body);


  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json('Note added successfully!');
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;