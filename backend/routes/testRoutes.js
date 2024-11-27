const connectToDb = require('../configs/db.config');

const getUsers = async (req, res) => {
  try {
    let db = await connectToDb();
    const collection = db.collection(process.env.DB_COLLECTION);
    const data = await collection.find({}).toArray();
    res.send({
      message: 'And the Backend too!',
      data
    });
  } catch (error) {
    console.error('Error accessing the database', error);
    res.status(500).send('Failed to fetch data');
  }
};

module.exports = {
  getUsers,
};