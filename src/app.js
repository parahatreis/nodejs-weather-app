const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const { send } = require('process');

// Get express function
const app = express();

// Define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');
const partialsPath = path.join(__dirname, '../templates/partials');

//  Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static diroctary to serve
app.use(express.static(publicPath));

// /
app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather',
      url : '/about'
   });
});

// ABOUT
app.get('/about', (req, res) => {
   res.render('about', {
      title : 'About',
   });
});

// HELP
app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      text: 'Help text',
   });
});

// Weather API
app.get('/weather', (req, res) => {
   // SEND REQ for WEATHER API
   if (!req.query.address) {
      return res.send({ error: 'Please input address' })
   }
   geocode(req.query.address, (error, {location, latitude , longitude} = {}) => {
      if (error) {
         return res.send({
            error: error
         })
      }
      forecast(latitude, longitude, (error, data) => {
         if (error) send({
            error: error
         })
         res.send({
            forecast: data,
            location,
            address: req.query.address
         })
      })
   })
    
});

// Products API
app.get('/products', (req, res) => {
   if (!req.query.search) {
      res.send({
         error : 'You must provide a search term'
      })
   }
   res.send({
      products: []
   })
});

// 404 page
app.get('*', (req, res) => {
   res.render('404', {
      title: '404',
      'errorMessage': 'Page Not found'
   });
});



// Starting Server
app.listen(3000, () => {
   console.log('Server is up on 3000');
});