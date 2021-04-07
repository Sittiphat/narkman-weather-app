// Core module first
const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utility/geocode")
const forecast = require("./utility/forecast")
const pollution = require("./utility/pollution")

// // Variable that shows path, but we can just use paths
// console.log(__dirname);
// console.log(__filename);
// This core module is navigating from relative path
console.log(path.join(__dirname, "../public"));

// Express is a function
const app = express();
const port = process.env.PORT || 3000

// Define Paths for Express Configs
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setuo handle bar engine and views location
// We can see documentation in Express API Website
// Setting up Express Handle Bars for Dynamic Templates using hbs
// It is built into express so hbs not needed yet
app.set("view engine", "hbs");
// // If we choose to rename views folder
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);


// Setup Static directory to serve
// A way to customize the server
// Pulls HTML and the express.static searches this file then return
app.use(express.static(publicDirectoryPath));

// Using to render one of our views
app.get("", (req, res) => {
    // Name of the file then all the objects you want view to access
    res.render("index.hbs", {
        title: "Pollution App",
        name: "Jesse Narkmanee"
    });
});

// Will not run unless not found but should be found
// index.html is special so no need to put anything
app.get("", (req, res) => {
    res.send("Hello express!");
});

app.get("/info", (req, res) => {
    res.render("help.hbs", {
        title: "More Info",
        msg: "Hello there",
        name: "Jesse Narkmanee"
    });
})

app.get("/info/*", (req, res) => {
  res.render("404.hbs",{
      title: "404 Page",
      name: "Jesse Narkmanee",
      errorMessage: "More Info Article not found!"
  });
})

app.get("/help/*", (req, res) => {
    res.send("Help article not found!");
})

app.get("/help", (req, res) => {
  res.send([{name: "Golf"}, {name: "Jesse"}]);
});

// Using Handle bars instead of hard coding then using .html
app.get("/about", (req, res) => {
  res.render("about.hbs",{
      title: "About Pollution",
      name: "Jesse Narkmanee"
  });
});

app.get("/about", (req, res) => {
    res.send("<h1>About<h1>");
});

// http://api.openweathermap.org/data/2.5/air_pollution?lat=27.2046&lon=77.4977&appid=f2766319db1b425a161fd09bd1549238

// app.get("/pollution", (req, res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: "You must provide a location address"
//         });
//     }

// })

app.get("/weather", (req, res) => {
    // Usually we send the HTML title
    if (!req.query.address) {
        return res.send({
            error: "You must provide weather address"
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error});
        }



        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            // res.send({
            //     forecast: forecastData,
            //     location,
            //     address: req.query.address
            // });
            pollution(latitude, longitude, (error, pollutionData) => {
                if (error) {
                    return res.send({error});
                }

                res.send({
                    forecast: forecastData,
                    pollution: pollutionData,
                    location,
                    address: req.query.address
                });
        });
        });
    });

    // res.send({
    //     forecast: "Snowing",
    //     location: "Philadelphia",
    //     address: req.query.address
    // });
});

app.get("/products", (req, res) => {
    if (!req.query.search) {
        // Do not send double sends
        return res.send({
            error: "You must provide a search term"
        })
    }
    console.log(req.query);
    res.send({
        products: []
    });
})

app.get("*", (req, res) => {
  res.render("404.hbs",{
      title: "404 Page",
      name: "Jesse Narkmanee",
      errorMessage: "Page not found!"
  });
});

// app.get('*', (req, res) => {
//     res.send("My 404 page")
// })

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});