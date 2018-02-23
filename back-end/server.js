const express = require ('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieSession = require('cookie-session');
const passport = require('passport');
const port = process.env.PORT || 3000;

require('./models/User');
require('./services/passport');
const keys = require('./config/keys');


mongoose.connect( process.env.MONGODB_URI || "mongodb://localhost/photography" );

const app = express();

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);

app.get('/',(req, res) => {
    res.send("Hello World")
});










app.listen(port, function() {
    console.log(`Listening on port ${port}`);
  });