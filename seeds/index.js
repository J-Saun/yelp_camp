const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '621689a697d4936b0a67282e',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
      price,
      images: [
        {
          url: 'https://res.cloudinary.com/dszk91djg/image/upload/v1645644925/YelpCamp/ddtjmb19loj7voolmjd2.jpg',
          filename: 'YelpCamp/ddtjmb19loj7voolmjd2',
          // _id: new ObjectId('62168c7f44dbdccc1ea00870'),
        },
        {
          url: 'https://res.cloudinary.com/dszk91djg/image/upload/v1645644939/YelpCamp/exmjkhkn0kvt8hm99ywc.jpg',
          filename: 'YelpCamp/exmjkhkn0kvt8hm99ywc',
          // _id: new ObjectId('62168c8d44dbdccc1ea00882'),
        },
        {
          url: 'https://res.cloudinary.com/dszk91djg/image/upload/v1645644961/YelpCamp/zwrcckyae3eagvorcwbd.jpg',
          filename: 'YelpCamp/zwrcckyae3eagvorcwbd',
          // _id: new ObjectId('62168ca344dbdccc1ea00899'),
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
