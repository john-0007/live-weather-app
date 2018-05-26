const yargs = require('yargs');
const axios = require('axios');

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

const key = 'AIzaSyAdc8UNeGoeppFSvw55lchRWQ0-towEzZs';
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find the address!');
  }
  const { lat, lng } = response.data.results[0].geometry.location;
  const key = '8172612a4a35f218d205e28725b12121';
  const weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
  return axios.get(weatherUrl);
}).then((response) => {
  const { temperature, apparentTemperature } = response.data.currently;
  console.log(`it's currently ${temperature}. it feel like ${apparentTemperature} `);
}).catch((error) => {
  if (error.code === 'ENOTFOUND') {
    console.log('Unable to connect to the API Server');
  } else {
    console.log(error.message);
  }
});
