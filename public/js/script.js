

// FORM
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
   e.preventDefault();
   const location = e.target.children[0].value;
   setWeather(location)
});


const message_1 = document.querySelector('#message-1');
const message_2 = document.querySelector('#message-2');

function setWeather(val) {
   fetch(`http://localhost:3000/weather?address=${val}`)
      .then((res) => res.json())
      .then((data) => {
         if (data.error) {
            console.log(data.error)
         } else {
            console.log(data)
            const {
               location,
               forecast
            } = data;
            const text = `${forecast.current} Celcius, Humidity : ${forecast.humidity}`;
            message_1.textContent = text
            message_2.textContent = location
         }
      })
}