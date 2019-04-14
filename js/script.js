$(document).ready(function(){
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				
				$.ajax({
					//url: "https://fcc-weather-api.glitch.me/api/current?lat=35.7&lon=139.7",
					url: "https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude,
					dataType: "json"
				})

				.done(function(json){
					temperature = json.main.temp;
					maxTemperature = json.main.temp_max;
					minTemperature = json.main.temp_min;
					$("#currentTemp").text(Math.floor(temperature) + " °C");
					$("h2").text(json.name + ', ' + json.sys.country);
					$("#maxTempBox").text(Math.floor(json.main.temp_max)  + " °C");
					$("#minTempBox").text(Math.floor(json.main.temp_min)  + " °C");
					$("#humidBox").text(json.main.humidity + "%");
					$("#pressureBox").text(json.main.pressure + " mb");
					document.getElementById("weatherIcon").src=json.weather[0].icon;
				})

				.fail(function(xhr, status, errorThrown){
					alert("An error occurred!");
					console.log("Error:" + errorThrown);
				})
			})
					
		}
	}

	getLocation();
});

$("#fahrButt").click(function(){
		var fahrTemp = (((temperature) * (9/5)) + 32);
		var fahrMaxTemp = (((maxTemperature) * (9/5)) + 32);
		var fahrMinTemp = (((minTemperature) * (9/5)) + 32);
		$("#currentTemp").text(Math.floor(fahrTemp).toString() + " °F");
		$("#maxTempBox").text(Math.floor(fahrMaxTemp).toString()  + " °F");
		$("#minTempBox").text(Math.floor(fahrMinTemp).toString()  + " °F");
	})

$("#celsButt").click(function(){
		$("#currentTemp").text(Math.floor(temperature) + " °C");
		$("#maxTempBox").text(Math.floor(maxTemperature)  + " °C");
		$("#minTempBox").text(Math.floor(minTemperature)  + " °C");
	})