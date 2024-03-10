//fetch('url') -> returns string of JSON from API
//JSON.parse('string') -> returns javascript object from a JSON formatted string
//
// let weather = fetch('https://samples.openweathermap.org/data/2.5/weather?q=London&appid=b1b15e88fa797225412429c1c50c122a1')
// weather.then(response => response.json())
//     .then(data => console.log(data))
import { APIKey} from "./API";

async function getWeatherData(location : string) {
    try {
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}`).then(res => res.json());
        console.log(weatherResponse);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
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

function getUserInput(): Promise<string> {
    return new Promise((resolve) => {
        readline.question("Enter a location: ", (location: string) => {
            readline.close();
            resolve(location);
        });
    });
}

async function main() {
    const userInput = await getUserInput();
    getWeatherData(userInput);
}
main().catch((error) => {
    console.error("An error occurred:", error);
});
// var userInput = getUserInput()
// getWeatherData(userInput)