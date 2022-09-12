# Simple-stock-chart

This project comprises of two parts:

1. Script: This fetches crypto data from a `coingecko api` and updates a csv file called `data.csv`

2. Stock-Chart: This shows a chart comparing multiple cryptocurrencies

## Technologies used:
Technologies used include:
- Reactjs
- Nodejs
- Expressjs

## How to run the project

### Clone the repository
    git clone https://github.com/Philippaolomoro/simple-stock-chart.git

### Run the script task
    cd script

    npm run dev

### Run the stock-chart task
    cd stock-chart

    npm start

## Making requests - script task

Use postman or any other api platform to make a get request to update the csv file after getting the data from the external api

> The routes can be found in the route.js file

> The base route is `localhost:5050/api/v1`