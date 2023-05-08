const mongoose = require('mongoose')
DB = process.env.DATABASE

mongoose.connect(DB)
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });
