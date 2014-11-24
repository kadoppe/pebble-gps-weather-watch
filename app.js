var UI = require('ui');
var Vector2 = require('vector2');

var window = new UI.Window({ fullscreen: true });

var timeText = new UI.TimeText({
  position: new Vector2(0, 59),
  size: new Vector2(144, 50),
  textAlign: 'center',
  font: 'gothic-28-bold',
  text: '%H:%M'
});

window.add(timeText);

var weatherText = new UI.Text({
  position: new Vector2(0, 120),
  size: new Vector2(144, 25),
  textAlign: 'center',
  font: 'gothic-18-bold',
  text: 'Loading...'
});

window.add(weatherText);
window.show();

navigator.geolocation.getCurrentPosition(function(position) {
  console.log(position.coords.latitude, position.coords.longitude);

  var apiUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude;

  console.log(apiUrl);

  var xhr = new XMLHttpRequest();
  xhr.onload = function() {
    var data = JSON.parse(this.responseText);

    var temperature = Math.round(data.main.temp - 273.15);
    var condition = data.weather[0].main;

    weatherText.text(temperature + "C, " + condition);
  };
  xhr.open('GET', apiUrl);
  xhr.send();

  /**
  Ajax(
    {
      URL: apiUrl,
      type: 'json',
    },
    function(data) {
      var temperature = Math.round(data.main.temp - 273.15);
      var condition = data.weather[0].main;

      weatherText.text(temperature + "C, " + condition);
    },
    function(error) {
      console.log('Faild fetching weather data: ' + error);
    }
  );
  */
});
