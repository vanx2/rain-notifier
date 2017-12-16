#!/usr/bin/env node

var req = require('request');

var host = 'http://api.openweathermap.org/data/2.5/forecast';
var location_id = '1859171';
var apikey = '12f61a4661bcf006e1f8331ff61a5cfd';

req(host + '?id=' + location_id + '&appid=' + apikey + '&lang=ja&units=metric', function (error, response, body) {
  var forcasts = JSON.parse(body);
console.log(forcasts);
  forcasts.list.forEach(function (f){
 //   var dt= new Date(f.dt_txt);
    var dt= new Date(f.dt * 1000 );
    console.log(f.dt_txt, dt.getDate(), dt.getHours(), f.main.temp, Math.ceil( f.rain.hasOwnProperty('3h') ? f.rain["3h"] : 0 ) , f.clouds.all, f.weather[0].id, f.weather[0].main, f.weather[0].description);
  });
});


