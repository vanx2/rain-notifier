#!/usr/bin/env node

var req = require('request');
var Moment = require('moment');

var host = "http://api.openweathermap.org/data/2.5/";
var location_id = '1859171';
var apikey = '12f61a4661bcf006e1f8331ff61a5cfd';

var forecastURI = host + 'forecast?id=' + location_id + '&appid=' + apikey + '&lang=ja&units=metric';
var currentURI = host + 'weather?id=' + location_id + '&appid=' + apikey + '&lang=ja&units=metric';

var forecast = current = "";

req(forecastURI, function (e, r, b) {
  var f = JSON.parse(b);
  forecast = f.list[0].weather[0].main;
//  forcasts.list.forEach(function (f){
//    var dt= new Date(f.dt_txt);
//    var dt= new Date(f.dt * 1000 );
//    console.log(f.dt_txt, Moment.unix(f.dt).format("YYYY-MM-DD HH:mm:ss"), dt.getDate(), dt.getHours(), f.main.temp, Math.ceil( f.rain.hasOwnProperty('3h') ? f.rain["3h"] : 0 ) , f.clouds.all, f.weather[0].id, f.weather[0].main, f.weather[0].description);
//  });
  cast();
});

req(currentURI, function (e, r, b) {
console.log(b);
  var c = JSON.parse(b);
  current = c.weather[0].main;
  cast();
});

function cast(){
  if (forecast && current) {
    console.log("current: " + current + " forecast: " + forecast);
    if (forecast == "Rain" && current != "Rain"){
      var options = {
        url: 'http://localhost:8081/cast',
        method: 'POST',
        form: {"text": "雨が降りそうですね"}
      };
      req(options, function (e, r, b) {
        console.log(b);
      });
    }
  }
}


