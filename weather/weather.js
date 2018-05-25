const request = require('request');

const getWeather = (lat, lng, callback) => {
  const key = '8172612a4a35f218d205e28725b12121';
  const url = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
  request({
    url,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const { temperature, apparentTemperature } = body.currently;
      callback(undefined, {
        temperature,
        apparentTemperature
      });
    } else {
      callback('Unable to fetch Weather.');
    }
  });
};

module.exports.getWeather = getWeather;
