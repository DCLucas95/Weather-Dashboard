//Start process when search button clicked
$("#search").on("click", function (event) {

  //variables
  var citySearch = $("#citySearched").val()
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=b97ce200929c2749eca4924f16dc7e98";
  event.preventDefault();

  //ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    $("#city-name").text(response.name)
    $("#city-weather").text("Weather: " + response.weather[0].main)
    $("#city-temp").text("Temperature: " + response.main.temp + " degrees celsius")
    $("#city-humidity").text("Humidity: " + response.main.humidity + "%")
    $("#city-wind").text("Wind Speed: " + response.wind.speed)
  });



  //ajax call for UV
  var queryURLforUV = "http://api.openweathermap.org/data/2.5/uvi?appid=&appid=b97ce200929c2749eca4924f16dc7e98&lat=" + latitude + "&lon=" + longitude;
  var latitude = response.coord.lat
  var longitude = response.coord.lon

  console.log(latitude)
  console.log(longitude)

  $.ajax({
    url: queryURLforUV,
    method: "GET"
  }).then(function (UVresponse) {
    console.log(UVresponse);
    $("#city-uv").text("UV Index: " /*this is where i will put the UV*/)
  });

});