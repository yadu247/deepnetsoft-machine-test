require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error: ', err));

app.use('/api/menu', require('./routes/menuRoutes'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
