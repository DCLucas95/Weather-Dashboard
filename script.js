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
    $("#city-name").text("Today: " + response.name)
    $("#city-weather").text("Weather: " + response.weather[0].main)
    $("#city-temp").text("Temperature: " + converter(response.main.temp) + " ℃")
    $("#city-humidity").text("Humidity: " + response.main.humidity + "%")
    $("#city-wind").text("Wind Speed: " + response.wind.speed + " m/s")


    //ajax call for UV
    var latitude = response.coord.lat
    var longitude = response.coord.lon
    var queryURLforUV = "https://api.openweathermap.org/data/2.5/uvi?&appid=b97ce200929c2749eca4924f16dc7e98&lat=" + latitude + "&lon=" + longitude;

    $.ajax({
      url: queryURLforUV,
      method: "GET"
    }).then(function (UVresponse) {
      console.log(UVresponse);
      $("#city-uv").text("UV Index: " + UVresponse.value)
    });

    //ajax call for 5 day forecast
    var queryURL5days = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=b97ce200929c2749eca4924f16dc7e98";
    $.ajax({
      url: queryURL5days,
      method: "GET"
    }).then(function (fivedays) {
      console.log(fivedays);

      //5 day forecast dates



      //5 day forecast weather
      $(".5Day1-weather").text("Weather: " + fivedays.list[10].weather[0].main)
      $(".5Day2-weather").text("Weather: " + fivedays.list[18].weather[0].main)
      $(".5Day3-weather").text("Weather: " + fivedays.list[26].weather[0].main)
      $(".5Day4-weather").text("Weather: " + fivedays.list[34].weather[0].main)
      $(".5Day5-weather").text("Weather: " + fivedays.list[39].weather[0].main)

      //5 day forecast temperature
      $(".5Day1-temp").text("Temperature: " + converter(fivedays.list[10].main.temp) + " ℃")
      $(".5Day2-temp").text("Temperature: " + converter(fivedays.list[18].main.temp) + " ℃")
      $(".5Day3-temp").text("Temperature: " + converter(fivedays.list[26].main.temp) + " ℃")
      $(".5Day4-temp").text("Temperature: " + converter(fivedays.list[34].main.temp) + " ℃")
      $(".5Day5-temp").text("Temperature: " + converter(fivedays.list[39].main.temp) + " ℃")

      //5 day forecast humidity
      $(".5Day1-humidity").text("Humidity: " + fivedays.list[10].main.humidity + " %")
      $(".5Day2-humidity").text("Humidity: " + fivedays.list[18].main.humidity + " %")
      $(".5Day3-humidity").text("Humidity: " + fivedays.list[26].main.humidity + " %")
      $(".5Day4-humidity").text("Humidity: " + fivedays.list[34].main.humidity + " %")
      $(".5Day5-humidity").text("Humidity: " + fivedays.list[39].main.humidity + " %")
    });
  });

  saveHistory(citySearch)
  displayHistory()
});

function converter(kelv2deg) {
  return Math.floor(kelv2deg - 273.15)
}

//Save searches to local storage
var pastSearches = []
function saveHistory(newCity) {
  pastSearches.push(newCity)
  localStorage.setItem("searched", JSON.stringify(pastSearches))
}

//Read local storage
function readHistory() {
  var storedString = localStorage.getItem("searched")

  if (storedString) {
    var storedArray = JSON.parse(storedString)
    pastSearches = storedArray
  }
}

//show previous searches
function displayHistory() {
  $(".previous-searches").empty()
  for (let i = 0; i < pastSearches.length; i++) {
    var pastSearch = pastSearches[i];
    $(".previous-searches").append(pastSearch)
  }
}

//run previous written functions
readHistory()
displayHistory()

//button to clear local storage
$('.clearSearches').on('click', clearLocalStorage);

function clearLocalStorage() {
  location.reload()
  window.localStorage.clear();
  alert("Searches have been cleared!")
}

/*
 //UV warnings
   if (UVresponse > 3){
     ("#city-uv").addClass("uvLevel")
 }
 */