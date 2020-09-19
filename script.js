  //variables
    var citySearch = $("#citySearched").val()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=b97ce200929c2749eca4924f16dc7e98";

//Start process when search button clicked
  $("#search").on("click", function(event) {
    event.preventDefault();

    console.log(citySearch)
    console.log(queryURL)

//ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
});
