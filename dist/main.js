"use strict";
//fetch('url') -> returns string of JSON from API
//JSON.parse('string') -> returns javascript object from a JSON formatted string
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports the secret API key from API.ts
const API_1 = require("./API");
//Queries the API for weather data using the location parameter. Displays data on success, gives error on fail
function getWeatherData(location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const weatherResponse = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_1.APIKey}&units=imperial`).then(res => res.json());
            displayData(weatherResponse, 0);
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
        }
    });
}
//Interface for reading user input
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
//Prompts user for input, and returns a promise to be resolved when they enter a location
function getUserInput() {
    return new Promise((resolve) => {
        readline.question("Enter a city (enter 'exit' to leave): ", (location) => {
            resolve(location);
        });
    });
}
//Displays all the weather data from the JSON object passed to it
function displayData(jsonObj, indent = 0) {
    // Loop through each key in the JSON object
    // for (const key in jsonObj) {
    //     if (jsonObj.hasOwnProperty(key)) {
    //         // Check if the value is another JSON object
    //         if (typeof jsonObj[key] === 'object' && jsonObj[key] !== null) {
    //             // Display the key and its corresponding value as an object
    //             console.log(`${' '.repeat(indent)}${key}:`);
    //             displayData(jsonObj[key], indent + 4); // Recursive call with increased indentation
    //         } else {
    //             // Display the key and its corresponding value
    //             console.log(`${' '.repeat(indent)}${key}: ${jsonObj[key]}`);
    //         }
    //     }
    // }
    // Display various fields from the weather json object
    console.log(`- Forecast: ${jsonObj['weather']['0']['description']}`);
    console.log(`- Temperature: ${jsonObj['main']['temp']} F`);
    console.log(`- Feels Like: ${jsonObj['main']['feels_like']} F`);
    console.log(`- Humidity: ${jsonObj['main']['humidity']}%`);
    console.log(`- Wind Speed: ${jsonObj['wind']['speed']} mph`);
}
//Main loop to query user and return weather data
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Given a location, I'll return the daily forecast for you to view!");
        let userInput = "";
        while (userInput.toLowerCase().trim() != 'exit') {
            userInput = yield getUserInput();
            yield getWeatherData(userInput);
        }
        readline.close();
    });
}
//Error catch for async main function
main().catch((error) => {
    console.error("An error occurred:", error);
});
