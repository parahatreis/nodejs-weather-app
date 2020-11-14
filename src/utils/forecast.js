const request = require('request');


const forecast = (lat, lon, callback) => {
   const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=a8c0fd891efc2eb4e61d1758af8a6db0`;

   request({
      url,
      json: true
   }, (error, response) => {
         
      if (error) {
         callback("Unable to connect weather services !", undefined);
      }
      else if (response.body.error) {
         callback("Unable to find location", undefined);
      }
      else {
         callback(undefined, {
            current: Math.round(response.body.main.temp - 273.15),
            humidity: response.body.main.humidity,
         })
      }
   })
}

module.exports = forecast;