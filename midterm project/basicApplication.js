/* ================================
Week 6 Assignment: Basic Application

Take a look at the midterm prototype: https://marvelapp.com/bf2c9h/screen/10434841
Try clicking on the "Next" and "Previous" buttons. This task will ask you to write some functions
that will enable us to write an application like in the midterm.

Write three functions: clickNextButton, clickPreviousButton, and saySlideName.
clickNextButton and clickPreviousButtons should simulate what will happen when someone clicks
on a next or previous button in your application.

You don't need to create HTML buttons or a useable application—this exercise is asking you to create
functions that will be used in your application. To test it out, try calling the functions in your
console. For example, try running: clickNextButton() and see what it does. Use lots of console logs!
================================ */
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_Toner = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.{ext}', {
	attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: 'abcd',
	minZoom: 0,
	maxZoom: 20,
	ext: 'png'
}).addTo(map);

var downloadCrime = $.ajax("https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/json/philadelphia-crime-snippet.json")

// a function that does some kind of transformation on the response
var parseData=function(rawData){ return JSON.parse(rawData)};

// a function that make markers
var makeMarkers = function(data){
  return _.map(data, function(x) {
    return L.marker([x.Lat,x.Lng])
  })
};

// plot markers on map
var plotMarkers=function(marker) {
  _.each(marker, function(n) {
    n.addTo(map)
  });
}

var state = {
  count: 0,
  data:  undefined,
};

var nextslide = function() {
  var limit = state.data.length -1;
  if (state.count +1 > limit){
    state.count = 0;
  }else {
    state.count = state.count +1;
  }
  return state.data[state.count]
}

var previousslide = function() {
  if(state.count -1 <0) {
    state.count = state.data.length -1;
  } else {
    state.count = state.count -1;
  }
  return state.data[state.count];
}






downloadCrime.done(function(data) {
  var parsed = parseData(data);
  console.log(parsed)
  console.log(parsed[1])

    var Thefts=_.filter(parsed, function(obj){
      return obj['General Crime Category'] === "Thefts"
    })


  var markers = makeMarkers(Thefts);
  state.data = parsed;
  plotMarkers(markers);



});
