const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB (you need to have MongoDB installed locally or use a cloud service)
mongoose.connect('mongodb://localhost:27017/expense-tracker', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

// Define your expense schema and model here using mongoose

// Define your routes for CRUD operations

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
