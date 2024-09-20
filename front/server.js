const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const eventRoutes = require('./routes/eventRoutes');
const needRoutes = require('./routes/needRoutes');
const orphanageRoutes = require('./routes/orphanageRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// Use routes
app.use('/users', userRoutes);
app.use('/donations', donationRoutes);
app.use('/events', eventRoutes);
app.use('/needs', needRoutes);
app.use('/orphanages', orphanageRoutes);
app.use('/volunteers', volunteerRoutes);

// Home route
app.get('/', (req, res) => {
    res.render('index', { user: req.session.user }); // Pass user session data if needed
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});