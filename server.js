/********************************************************************************
* WEB322 – Assignment 04
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Bruno Amaral Student ID: 143766228 Date: March 01, 2024
*
* Published URL:
*
********************************************************************************/

const unCountriesData = require("./modules/unCountries");

const express = require("express");
const app = express();
const path = require("path");

app.set('view engine', 'ejs');

//Initializing the server
unCountriesData.initialize().then(() => {
    app.listen(8080, () => {
        console.log("Server is running on port 8080");
    });
}).catch(error => {
    console.log("Failed to initialize data: ", error);
});

// Define the public directory like STATIC
app.use(express.static('public'));

// Setting the routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/un/countries", (req, res) => {
    const { region } = req.query;
    if (region) {
        unCountriesData.getCountriesByRegion(region)
            .then(countries => res.json(countries))
            .catch(error => res.status(500).send(error));
    } else {
        unCountriesData.getAllCountries()
            .then(allCountries => res.json(allCountries))
            .catch(error => res.status(500).send(error));
    }
});

app.get("/un/countries/countries-demo/:countryCode", (req, res) => {
    const countryCode = req.params.countryCode;
    unCountriesData.getCountryByCode(countryCode)
    .then(country => {
        if (!country) {
            return res.status(404).send("Country not found");
        }
        res.json(country);
    })
    .catch(error => res.status(404).send(error));
});

app.get("/un/countries/region-demo", (req, res) => {
    const region = "oceania";
    unCountriesData.getCountriesByRegion(region)
    .then(countries => res.json(countries))
    .catch(error => res.status(404).send(error));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});


//http://localhost:8080