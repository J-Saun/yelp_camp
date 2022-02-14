// app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const Campground = require('./models/campground');
// const res = require('express/lib/response');

mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
  // useCreateIndex: true,
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
app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
});

app.get('/campground', async (req, res) => {
  const camp = new Campground({ title: 'backyard', description: 'cheap' });
  await camp.save();
  res.send(camp);
});

app.listen(5500, () => {
  console.log('listening on 5500');
});
