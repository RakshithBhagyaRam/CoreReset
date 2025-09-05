
// Basic Node.js + Express backend with MongoDB connection
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// User routes
const userRoutes = require('./routes/userRoutes');
app.use('/api', userRoutes);


// Build MongoDB URI using DBPASSWORD from .env
const dbPassword = process.env.DBPASSWORD;
const mongoURI = process.env.MONGODB_URI?.replace('${DBPASSWORD}', dbPassword) ||
  `mongodb+srv://rakshithbhagyaram_db_user:${dbPassword}@cr.pus6mob.mongodb.net/?retryWrites=true&w=majority&appName=CR`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
