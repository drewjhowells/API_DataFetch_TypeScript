"use strict";
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
//fetch('url') -> returns string of JSON from API
//JSON.parse('string') -> returns javascript object from a JSON formatted string
//
// let weather = fetch('https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1')
// weather.then(response => response.json())
//     .then(data => console.log(data))
const API_1 = require("./API");
function getWeatherData(location) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const weatherResponse = yield fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_1.APIKey}`).then(res => res.json());
            console.log(weatherResponse);
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
        }
    });
}
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});
// function getUserInput() : string {
//     readline.question("Enter a location: ", (location: string) => {
//         readline.close();
//         return location
//     })
//     return ""
// }
function getUserInput() {
    return new Promise((resolve) => {
        readline.question("Enter a location: ", (location) => {
            readline.close();
            resolve(location);
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const userInput = yield getUserInput();
        getWeatherData(userInput);
    });
}
main().catch((error) => {
    console.error("An error occurred:", error);
});
// var userInput = getUserInput()
// getWeatherData(userInput)
