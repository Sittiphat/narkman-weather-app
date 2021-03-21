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
const search = document.querySelector("input")
const messageOne = document.querySelector("#p1")
const messageTwo = document.querySelector("#p2")

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const location = search.value;
    // console.log(location);
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch("/weather?address=" + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            // console.log(data.error)
            messageOne.textContent = data.error 
        } else {
            messageOne.textContent = `Location Chosen: ${data.location}`; 
            messageTwo.textContent = "The temperature is " + data.forecast.temperature + "° Fahrenheit."; 
            // console.log(data.location);
            // console.log(data.forecast);
        }
    })
})
})

