const mongoose = require('mongoose');
const connectToMongo = require('./db');
connectToMongo(); // Appel à la fonction de connexion dans db.js

const express = require('express');
const app = express();
const port = 3001;

const cors = require('cors');
const router = require('./Routes/router');

app.use(cors());
app.use(express.json());
app.use(router);

// Supprime cette ligne, car la connexion est déjà gérée par connectToMongo()
// mongoose.connect("mongodb://127.0.0.1:27017/users", { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log("Connected to MongoDB");
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   })
//   .catch(error => console.error("Error connecting to MongoDB:", error));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
