const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3001;
const userRoutes = require('./routes/userRoutes');

// Enabling CORS for all routes
app.use(cors());
app.use(express.json());

// Connecting to MongoDB with the correct connection string
mongoose.connect('mongodb+srv://royaman56456:Aman12345@cluster0.pjvg6sa.mongodb.net/crud_db', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
