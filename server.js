const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const { moviesCollection, ObjectId } = require('./db');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const movieRouter = require('./routes/movies');
app.use('/movies', movieRouter);

app.get('/', (req, res) => {
    res.redirect('/movies');
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
