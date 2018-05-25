const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const { argv: { address } } = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      decribe: 'Adress to fetch weather',
      string: true
    }
  })
  .help()
  .alias('help', 'h');

geocode.geocodeAddress(address, (errorMessage, response) => {
  if (errorMessage) {
    console.log(errorMessage);
  } else {
    const { address, lat, lng } = response;
    console.log(address);
    weather.getWeather(lat, lng, (errorMessage, response) => {
      if (errorMessage) {
        console.log('here we go');
        console.log(errorMessage);
      } else {
        const { temperature, apparentTemperature } = response;
        console.log(`it's currently ${temperature}. It's feel like ${apparentTemperature}`);
      }
    });
  }
});

