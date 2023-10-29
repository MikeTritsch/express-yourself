// Imports/Packages //
const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const api = require('./routes/index.js');

// PORT // 
const PORT = process.env.PORT || 5001;

// INIT EXPRESS //
const app = express();

// CUSTOM MIDDLEWARE
app.use(clog);

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use('/api', api);

app.use(express.static('public'));

// GET Homepage //
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET Notes page
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'))
});


// WILDCARD redirect to home page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// SERVER
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

