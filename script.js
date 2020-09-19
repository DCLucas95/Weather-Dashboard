  //variables
    var citySearch = $("#city").val();
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=b97ce200929c2749eca4924f16dc7e98";


  //ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });


  //Save searches in local storage
  function searchTemp(){
    localStorage.setItem(Searched,"citySearch");
  }
  



 
function formatSearch(jsonObject) {
    var cityName = jsonObject.name;
    var cityWeather = jsonObject.weather[0].main;
    var cityTemp = jsonObject.main.temp;

    $("city-name").text(cityName);
    $("city-name").text(cityWeather);
    $("city-name").text(cityTemp);
} 