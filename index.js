// app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
// const res = require('express/lib/response');
const Campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  // useCreateIndex: true, // giving an error: unsupported
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/campground', async (req, res) => {
  const camp = new Campground({
    title: 'My Backyard',
    description: 'cheep camping',
  });
  await camp.save();
  res.send(camp);
});

app.listen(5500, () => {
  console.log('listening on 5500');
});
