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
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
	console.log("Your location is: " + lat + "° , " + lng + "°");
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
			$("#weather-data .temperature").html("<h2>" + data.currently.temperature + "°C</h2>");
			console.log(data.currently.temperature);
			console.log(data.daily.data[0].temperatureMax);
			console.log(data.daily.data[0].temperatureMin);
			console.log(data.daily.data[0].icon);
			$("#weather-details .humidity").html("<p>Humidity: " + data.currently.humidity * 100 + "%</p>");
			console.log(data.currently.humidity);
			$("#weather-details .wind").html("<p>Wind: " + data.currently.windSpeed + " KPH</p>");
			console.log(data.currently.windSpeed);
		}
	});
}