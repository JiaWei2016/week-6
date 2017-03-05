
var map = L.map('map', {
  center: [39.924413, -75.179354],
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

var layerPlottedMarkers = [];

downloadCrime.done(function(data) {
  var parsed = parseData(data);
  console.log(parsed)

//Group data
    var Thefts=_.filter(parsed, function(obj){
      return obj['General Crime Category'] === "Thefts"
    })
    console.log(Thefts)

    var Rape=_.filter(parsed, function(obj){
      return obj['General Crime Category'] === "Rape"
    })

    var Narcotic=_.filter(parsed, function(obj){
      return obj['General Crime Category'] === "Narcotic / Drug Law Violations"
    })

    var Vehicles=_.filter(parsed, function(obj){
      return obj['General Crime Category'] === "Theft from Vehicle"
    })

//Create dataset
     var state = {
       "count": 1,
       "data": [
         {
           "topic":"Crime overview in Philadelphia",
           "description":"Crime overview in Philadelphia"
         },
         {
           "topic":"Thefts in Philadelphia",
           "description":"Thefts in Philadelphia"
         },
         {
           "topic":"Rapes in Philadelphia",
           "description":"Rapes in Philadelphia"
         },
         {
           "topic":"Narcotic in Philadelphia",
           "description":"Narcotic in Philadelphia"
         },
         {
           "topic":"Thefts from vehicles in Philadelphia",
           "description":"Thefts from vehicles in Philadelphia"
         }
       ],
     };
     console.log(state)

//next slides and previous slides button
    var nextslide = function(event) {
      var limit = state.data.length -1;
      if (state.count +1 > limit){
        state.count = 0;
      }else {
        state.count = state.count +1;
      }
      return state.data[state.count]
    }


    var previousslide = function(event) {
      if(state.count -1 <0) {
        state.count = state.data.length -1;
      } else {
        state.count = state.count -1;
      }
      return state.data[state.count];
    }

//add markers functions
  var markers_overview = function(data){
    return _.map(data, function(x) {
      return L.marker([x.Lat,x.Lng]).bindPopup("Type: " + x["General Crime Category"]+", "  + "Location: " + x['Location Block']+", "
      +"Time: "+x['Dispatch Date/Time']).openPopup().addTo(map)
    })
  };

  var makeMarkers = function(data){
    return _.map(data, function(x) {
      return L.marker([x.Lat,x.Lng]).bindPopup("Location: " + x['Location Block']+", " +"Time: "+x['Dispatch Date/Time']).openPopup().addTo(map)
    })
  };

//remove markers functions
  var removeMarkers = function(markers) {
   _.each(markers,function(m){
     map.removeLayer(m)
   });
};

  //  makeMarkers(parsed)
  //  var CrimeMarkers = makeMarkers(parsed)
  //  removeMarkers(CrimeMarkers)

//slide functions
  var slideone = function(){
    $(".subtitle").html("Crime overview");
    $(".main").html("You are able to know crime type and location.Try to click on any point,then you are able to find their crime type, time and location information.");
      $("#previous").hide();
      console.log(layerPlottedMarkers)
      if(layerPlottedMarkers.length){
        removeMarkers(layerPlottedMarkers)
        layerPlottedMarkers = [];
      };
       layerPlottedMarkers = markers_overview(parsed);
  }
  // console.log(slideone())

  var slidetwo = function(){
    map.setView([39.919783, -75.172422], 14)
    $(".subtitle").html("Thefts");
    $(".main").html("Try to click on any point,then you are able to find their time and location information.");
      // makeMarkers(Thefts)
    if(layerPlottedMarkers.length){
      removeMarkers(layerPlottedMarkers)
      layerPlottedMarkers = [];
    };
     layerPlottedMarkers = makeMarkers(Thefts);

  }
  // console.log(slidetwo())

  var slidethree = function(){
    map.setView([39.919783, -75.172422], 11)
    $(".subtitle").html("Rapes");
    $(".main").html("Try to click on any point,then you are able to find their time and location information.");
      // makeMarkers(Rape)
    if(layerPlottedMarkers.length){
      removeMarkers(layerPlottedMarkers)
      layerPlottedMarkers = [];
    };
     layerPlottedMarkers = makeMarkers(Rape);
  }

  var slidefour = function(){
    map.setView([39.919783, -75.172422], 14)
    $(".subtitle").html("Narcotic / Drug Law Violations ");
    $(".main").html("Try to click on any point,then you are able to find their time and location information.");
      // makeMarkers(Narcotic)
      if(layerPlottedMarkers.length){
        removeMarkers(layerPlottedMarkers)
        layerPlottedMarkers = [];
      };
       layerPlottedMarkers = makeMarkers(Narcotic);
  }

  var slidefive = function(){
    $(".subtitle").html("Thefts from vehicles ");
    $(".main").html("Try to click on any point,then you are able to find their time and location information.");
      // makeMarkers(Vehicles)
      if(layerPlottedMarkers.length){
        removeMarkers(layerPlottedMarkers)
        layerPlottedMarkers = [];
      };
       layerPlottedMarkers = makeMarkers(Vehicles);
  }

//remove perious layer

//zoom
  var zoom=L.latLng(39.919783, -75.172422)
  var zoomout= function(){
    map.setView(zoom, 11)
  }

//add slides
  var showslides= function(){
    if (state.count === 1){
        slideone ();
        zoomout();

        $("#next").show();
    } else if (state.count === 2){
        slidetwo ();
        $("#previous").show();
        $("#next").show();
    } else if (state.count === 3){
        slidethree ();
        $("#previous").show();
        $("#next").show();
    } else if (state.count === 4){
        slidefour ();
        $("#previous").show();
        $("#next").show();
    } else {
        slidefive ();
        $("#previous").show();
        $("#next").show();
    };
 }
 // console.log(showslides())

 $(document).ready(function() {
   $("#previous").hide();
   layerPlottedMarkers = markers_overview(parsed);
   map.setView([39.919783, -75.172422], 11)
   //function of button
    $("#next").click(function(event){
      console.log("next clicked");
      nextslide();
      showslides();
    })

    $("#previous").click(function(){
      console.log("previous clicked");
      previousslide();
      showslides();
    })
 });
});
