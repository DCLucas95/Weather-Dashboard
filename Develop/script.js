//Start process when search button clicked
$("#search").on("click", function (event) {

  //variables
  var citySearch = $("#citySearched").val()
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=b97ce200929c2749eca4924f16dc7e98";
  event.preventDefault();

  //ajax call todays weather
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    //Current Day Display
    $("#city-name").text(response.name + " Today:")
    $('#CurrentWicon').attr('src', "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
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
      var uvDanger = $("#city-uv")
      if (UVresponse.value < 3) {
        uvDanger.addClass("uvLow");
      }
      else if (UVresponse.value < 5) {
        uvDanger.addClass("uvMedium");
      }
      else {
        uvDanger.addClass("uvHigh");
      }

    });

    //ajax call for 5 day forecast
    var queryURL5days = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=b97ce200929c2749eca4924f16dc7e98";
    $.ajax({
      url: queryURL5days,
      method: "GET"
    }).then(function (fivedays) {
      console.log(fivedays);

      //5 day forecast dates weather icons
      $('#icon5day1').attr('src', "http://openweathermap.org/img/w/" + fivedays.list[7].weather[0].icon + ".png")
      $('#icon5day2').attr('src', "http://openweathermap.org/img/w/" + fivedays.list[15].weather[0].icon + ".png")
      $('#icon5day3').attr('src', "http://openweathermap.org/img/w/" + fivedays.list[23].weather[0].icon + ".png")
      $('#icon5day4').attr('src', "http://openweathermap.org/img/w/" + fivedays.list[31].weather[0].icon + ".png")
      $('#icon5day5').attr('src', "http://openweathermap.org/img/w/" + fivedays.list[39].weather[0].icon + ".png")


      //5 day forecast weather
      $(".5Day1-weather").text("Weather: " + fivedays.list[7].weather[0].main)
      $(".5Day2-weather").text("Weather: " + fivedays.list[15].weather[0].main)
      $(".5Day3-weather").text("Weather: " + fivedays.list[23].weather[0].main)
      $(".5Day4-weather").text("Weather: " + fivedays.list[31].weather[0].main)
      $(".5Day5-weather").text("Weather: " + fivedays.list[39].weather[0].main)

      //5 day forecast temperature
      $(".5Day1-temp").text("Temperature: " + converter(fivedays.list[7].main.temp) + " ℃")
      $(".5Day2-temp").text("Temperature: " + converter(fivedays.list[15].main.temp) + " ℃")
      $(".5Day3-temp").text("Temperature: " + converter(fivedays.list[23].main.temp) + " ℃")
      $(".5Day4-temp").text("Temperature: " + converter(fivedays.list[31].main.temp) + " ℃")
      $(".5Day5-temp").text("Temperature: " + converter(fivedays.list[39].main.temp) + " ℃")

      //5 day forecast humidity
      $(".5Day1-humidity").text("Humidity: " + fivedays.list[7].main.humidity + " %")
      $(".5Day2-humidity").text("Humidity: " + fivedays.list[15].main.humidity + " %")
      $(".5Day3-humidity").text("Humidity: " + fivedays.list[23].main.humidity + " %")
      $(".5Day4-humidity").text("Humidity: " + fivedays.list[31].main.humidity + " %")
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
