const request = require('request');
require('dotenv').config();

const geocode = (address, callback) => {
   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.TOKEN}`;
   
  request({ url, json: true }, (error, response) => {
      if (error || !response.body.features) {
         callback('Unable to find location services', undefined);
      }
      if (response.body.features.length === 0) {
         callback('Unable to find location . Try another location', undefined);
      }
      else {
         callback(undefined, {
            longitude : response.body.features[0].center[0],
            latitude: response.body.features[0].center[1],
            location: response.body.features[0].place_name
         })
      }
   })
}

module.exports = geocode;