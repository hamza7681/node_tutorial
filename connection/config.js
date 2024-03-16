const mongoose = require('mongoose');
const db = process.env.DB_URL;

const connection = async () => {
  await mongoose
    .connect(db)
    .then(() => console.log('Database connected'))
    .catch((e) => console.log('Connection failed', e));
};

module.exports = connection;
