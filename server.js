const express = require('express');
const path = require('path');


const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);

  next();
}


const app = express();
app.use(logger);


app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/notes', require('./routes/notesRoute.js'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

