const request = require('request');

const geocodeAddress = (address, callback) => {
  const key = 'AIzaSyAdc8UNeGoeppFSvw55lchRWQ0-towEzZs';
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${key}`;
  request({
    url,
    json: true
  }, (error, reponse, body) => {
    if (error) {
      callback('Unable to connect to the server');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find the address');
    } else if (body.status === 'OK') {
      const results = body.results[0];
      const { formatted_address: address, geometry: { location: { lat, lng } } } = results;
      callback(undefined, {
        address,
        lat,
        lng
      });
    }
  });
};

module.exports = { geocodeAddress };
