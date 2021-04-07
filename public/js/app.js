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
            let pm = data.pollution.pm2_5;
            let pm_day = Math.round(pm/22);
            messageOne.textContent = `Location Chosen: ${data.location}`; 
            messageTwo.textContent = "The temperature is " + data.forecast.temperature + "°F, " + data.forecast.description.toLowerCase() + " with " + data.forecast.precipitation + "% chance of rain.";
            messageThree.textContent = "Current air quality outside is equivalent to smoking " + pm_day + " cigarettes per day!";
            

            for (let i = 0; i < pm_day; i++) {
                const image = document.createElement("img");
                image.src = "/img/cig.png";
                image.classList.add("cig-png");
                document.querySelector('.container').appendChild(image);
            }
            // console.log(data.location);
            // console.log(data.forecast);
        }
    })
})
})

