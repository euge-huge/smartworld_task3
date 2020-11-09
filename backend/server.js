const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');

//Creating app
const app = express();

//Express config
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// CORS
app.use(cors())

// Register ROUTES
app.use("/api/task", require("./routes/task.route"))
app.use("/api/list", require("./routes/list.route"))

// Getting PORT
const PORT = process.env.PORT || 5000

const start = () => {
  try {
    mongoose.connect(
      config.get("mongoUri"),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }, 
      () => console.log("MongoDB Connected...")
    );
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))

  } catch (e) {
    console.log("Server Error", e.message)
    process.exit(1)
  }
}

start();