//Start process when search button clicked
  $("#search").on("click", function(event) {
    
  //variables
    var citySearch = $("#citySearched").val()
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=b97ce200929c2749eca4924f16dc7e98";
    event.preventDefault();

    console.log(citySearch)
    console.log(queryURL)

//ajax call
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $("#city-name").text(response.name)
    $("#city-weather").text("Weather: "+ response.weather[0].main)
    $("#city-temp").text("Temperature: "+response.main.temp +" degrees celsius")
    $("#city-wind").text("Wind Speed: "+ response.wind.speed)
    $("#city-uv").text("City: "+ response.name)
  });
});

function kelvinConverter(K) {
  return Math.floor((K - 273.15) *1.8 +32);
}






/*
 // Creating a paragraph tag with the selected city
 var city = $("#citySearched").text(response.);

 // Creating an image tag
 var personImage = $("<img>");

 // Giving the image tag an src attribute of a proprty pulled off the
 // result item
 personImage.attr("src", results[i].images.fixed_height.url);

 // Appending the paragraph and personImage we created to the "gifDiv" div we created
 gifDiv.append(p);
 gifDiv.append(personImage);
 */