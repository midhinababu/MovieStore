const express = require('express');
const router = express.Router();
const { moviesCollection, ObjectId } = require('../db');
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({ storage: storage });



router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});



router.get('/movielist', async (req, res) => {
    console.log("called api movie list");
    
    try {
        const movies = await moviesCollection.find().toArray();
        console.log("movies",movies);
        
        res.render('movielist', { movies });
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



router.post('/',upload.single('movieImage'), async (req, res) => {
    const movie = {
        title: req.body.title,
        releaseYear: req.body.releaseYear,
        genre:req.body.genre,
        director: req.body.director,
        actors: req.body.actors,
        duration: req.body.duration,
        rating: req.body.rating,
        description: req.body.description,
        imagePath: req.file.path
    };

    try {
        await moviesCollection.insertOne(movie);
        res.redirect('/'); 
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
