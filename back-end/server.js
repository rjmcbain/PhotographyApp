const express = require ('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const port = process.env.PORT || 3000;
require('./models/User');
require('./services/passport');


mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/photography" );

const app = express();

authRoutes(app);

app.get('/',(req, res) => {
    res.send("Hello World")
});










app.listen(port, function() {
    console.log(`Listening on port ${port}`);
  });