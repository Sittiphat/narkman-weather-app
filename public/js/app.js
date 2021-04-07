console.log("Client side Javascript file is loaded");


// fetch("http://localhost:3000/weather?address=" + location).then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//             console.log(data.error) 
//         } else {
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#p1");
const messageTwo = document.querySelector("#p2");
const messageThree = document.querySelector("#p3");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    // console.log(location);
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";
    messageThree.textContent = "";

    fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            // console.log(data.error)
            messageOne.textContent = data.error 
        } else {
            messageOne.textContent = `Location Chosen: ${data.location}`; 
            messageTwo.textContent = "The temperature is " + data.forecast.temperature + "°F, " + data.forecast.description + " with " + data.forecast.precipitation + "% chance of rain.";
            messageThree.textContent = JSON.stringify(data.pollution);
            // console.log(data.location);
            // console.log(data.forecast);
        }
    })
})
})

