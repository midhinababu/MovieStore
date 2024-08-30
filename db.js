const { MongoClient, ObjectId } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

connectDB();

const db = client.db('movieStore');
const moviesCollection = db.collection('movies');
const genresCollection = db.collection('genres');
const actorsCollection = db.collection('actors');
const directorsCollection = db.collection('directors');

module.exports = {
    moviesCollection,
    genresCollection,
    actorsCollection,
    directorsCollection,
    ObjectId
};
