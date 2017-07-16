# Weather Forecast Web App
Web app that recommends clothing to wear based on weather forecast at user's location

## Getting Started

To get the project up and running on your local machine you need to clone this repository, install **npm package manager, bower, gulp** and **grunt**.

## Installation

- To clone this repo, run 
    ```
    $ git clone https://github.com/rafmosiolek/weather-app.git
    ```
- Install the dependencies defined in a package.json file with the node package manager
    ```
    $ npm install
    ```
- Navigate to the repository
    ```
    $ cd ../path_to_the_repo/weather-app
    ```
- Check out the app by running
    ```
    $ gulp serve
    ```


## Built with

Javascript and its APIs: 
- Geolocation API 
- Google Maps Geocoding API
- Darksky API

I used jQuery for DOM manipulation and ajax requests (JSONP) for the sake of simplicity.

Twitter's Bootstrap to make sure web app is fully responsive. I could have used flexbox and percentages, but Bootstrap does the job just fine.

The application was scaffolded with Yeoman WebApp Generator.


## Possible ways of improvement

* Tests, and that's the biggie. I should have included some BDD testing while developing an app.
* The clothing tips are quite limited at the moment, just good enough to present my approach and logic behind the application. In a 'full version' I would like them to be much more detailed (taking into account more factors available at the Darksky API).
* At the moment styling is very basic, I would like to work on that in the future.
* Add some cool favicon!
* I am not fully satisfied with the response time, there's definetely a room for improvment here.


![Screen-shot](/app/images/screen-shot.png?raw=true)
 