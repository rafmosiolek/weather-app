$(document).ready(function() {
	console.log("app is ready!");
	userGeoLocation();
});

function userGeoLocation() {
	// use the Geolocation object to obtain position of user's device
	// check if the user's browser supports geolocation API
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {timeout:10000});
	}
}

function successCallback(position) {
	// store user's device coordinates in lat and lng variables
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	console.log("Your location is: " + lat + "° , " + lng + "°");
	// call displayCity and fireDarkskyApi functions
	displayCity(lat, lng);
	fireDarkskyApi(lat, lng);

}

function errorCallback(error) {
	$("#error").html("<p>Geolocation is not supported by this browser! <br />" + errorMsg + "</p>");
	var errorMsg = "Unknown error";
	switch(error.code) {
		case 1:
			errorMsg = "Permission denied";
			break;
		case 2:
			errorMsg = "Position unavailable";
			break;
		case 3:
			errorMsg = "Timeout";
			break;
	}
	console.log(errorMsg);
	console.log(error.code);
}

function displayCity(latitude, longitude) {
	// use Google Maps Geocoding API to get the user's location by latitude and longitude look up
	$.ajax({
		format: "json",
		dataType: "json",
		url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + ", " + longitude + "&sensor=true?key=madebymanyrules",
		success: function(data) {
			$("#location .row").html("<h2>" + data.results[0].address_components[1].long_name + ", " + data.results[0].address_components[4].long_name + "</h2>");
			console.log(data.results[0].address_components[1].long_name);
			console.log(data.results[0].address_components[4].long_name);
		},
		method: "GET"
	});
}

function fireDarkskyApi(latitude, longitude) {
	var url = "https://api.darksky.net/forecast/c78e6b910ba14ef6ac41cfc1e46b3af5/" + latitude + "," + longitude + "?units=si";
	console.log(url);
	getDarkskyData(url);
}


function getDarkskyData(url) {
	$.ajax({
		format: "jsonp",
		dataType: "jsonp",
		url: url,
		success: function(data) {
			$("#weather-data .temperature").html("<h2>" + (Math.round(data.currently.temperature).toFixed(1)) + "°C</h2>");
			console.log("Current temp: " + data.currently.temperature);
			console.log("High temp: " + data.daily.data[0].temperatureMax);
			console.log("Min temp: " + data.daily.data[0].temperatureMin);
			console.log(data.daily.data[0].icon);
			$("#weather-details .humidity").html("<p>Humidity: " + data.currently.humidity * 100 + "%</p>");
			console.log("Humidity: " + data.currently.humidity);
			$("#weather-details .wind").html("<p>Wind: " + data.currently.windSpeed + " KPH</p>");
			console.log("Wind speed: " + data.currently.windSpeed);

			console.log(data.hourly.data[0].precipProbability);
			// pass the temperature for the next hour and precipitation probability as giveTip function's parameters
			giveTip(data.hourly.data[0].temperature, data.hourly.data[0].precipProbability);
			// pass the icon as a setBackground's parameter
			setBackground(data.daily.data[0].icon);
		}
	});
}


function giveTip(temp, precip) {
	console.log(temp, precip);

	var tip = "";
	// statements for temperature
	if (temp >= 20) {
		tip += "It's a T-shirt weather! ";
	} else if (temp >= 10) {
		tip += "It's a sweater weather! ";
	} else if (temp >= 0){
		tip += "Wear warm undies! ";
	} else {
		tip += "It's freezing outside! Layer up! ";
	}

	// statements for precipitation
	if (precip >= 0.6) {
		tip += "And it is going to rain, don't forget your brolly!";
	} else if (precip >= 0.3) {
		tip += "And it might rain, you better take your rain coat!";
	} else {
		tip += "No need for umbrella today, yaaay!";
	}
	
	$("#clothing-tips .tips").html("<p>" + tip + "</p>");

}


function setBackground(icon) {
	console.log(icon);
	switch (icon) {
		case "clear-day":
			$("body").css("background", "#f1c40f");
			break;
		case "clear-night":
			$("body").css("background", "#7678ED");
			break;
		case "rain":
			$("body").css("background", "#345995");
			break;
		case "snow":
			$("body").css("background", white);
			break;
		case "sleet":
			$("body").css("background", blue);
			break;
		case "wind":
			$("body").css("background", grey);
			break;
		case "fog":
			$("body").css("background", grey);
			break;
		case "cloudy":
			$("body").css("background", "#bdc3c7");
			break;
		case "partly-cloudy-day":
			$("body").css("background", "#D3F3EE");
			break;
		case "partly-cloudy-night":
			$("body").css("background", "#95a5a6");
			break;
		default:
			break;
	}
}



