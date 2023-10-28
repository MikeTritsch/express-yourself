const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils.js');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const note = path.join(__dirname, '../db/db.json');


notes.get('/', (req, res) => {
  readFromFile(note).then((data) => res.json(JSON.parse(data)))
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

    readAndAppend(newNote, note);
    res.json('Note added successfully!');
  } else {
    res.error('Error in adding note');
  }
});

module.exports = notes;