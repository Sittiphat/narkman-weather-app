const request = require("postman-request");

const pollution = (latitude, longitude, callback) => {
    const url =
      "http://api.openweathermap.org/data/2.5/air_pollution?lat=" + latitude + "&lon="+ longitude +"&appid=f2766319db1b425a161fd09bd1549238";
    // We can do the same shorthand method with response (See playgrounds for more notes)
    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback("Unable to connect to pollution!", undefined);
        } else if (response.body.error) {
            callback("Unable to find location!", undefined);
        } else {
            // console.log("Here is the poll data");
            console.log(response.body.list[0]);
            callback(undefined, {
                aqi: response.body.list[0].main.aqi,
                components: response.body.list[0].components,
                pm2_5: response.body.list[0].components.pm2_5,
            });
        }
    });
}

module.exports = pollution;