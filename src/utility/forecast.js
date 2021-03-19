const request = require("postman-request");


const forecast = (latitude, longitude, callback) => {
    const url =
      "http://api.weatherstack.com/current?access_key=b29c40391b1d4512c94bf29eaeb43282&query=" + latitude +
      "," + longitude + "&units=f";
    // We can do the same shorthand method with response (See playgrounds for more notes)
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to weather!", undefined);
        } else if (response.body.error) {
          callback("Unable to find location!", undefined);
        } else {
          callback(undefined, {
            description: response.body.current.weather_descriptions[0],
            temperature: response.body.current.temperature,
            precipitation: response.body.current.precip,
          });
        }
    });
}

module.exports = forecast;