let canvas;
let myMap;
const key = 'pk.eyJ1IjoiYmF2YS1rdW1hcmF2ZWwiLCJhIjoiY2psNXg0NTI1Mml0cjNxcDJ1d3Yyb3FuNCJ9.fPDDUsub66z1ItHK9dCVuw';
const mappa = new Mappa('Mapbox', key);
var data;
let tripCoordinates;
let allCoordinates = [];

//Variables for animating the taxi
let delta=0;
let coordinate=0;
let origin;
let originVector;
let destination;
let destinationVector;
let taxiPosition;
let visitedRoutes =[];

const options={
    lat:40.73447,
    lng:-73.980,
    zoom:13,
    studio: true,
    style:'mapbox://styles/mapbox/dark-v9',
    
};

function preload(){
    data = loadJSON('data/taxiday1.geojson');
}

function setup(){
    canvas = createCanvas(1000,1000);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);
    tripCoordinates = myMap.geoJSON(data, "LineString");
    tripCoordinates.forEach(function(trip) {
        trip.forEach(function(coordinate){
            allCoordinates.push(coordinate);
        })
    });
    //myMap.onChange(drawPoints);
}

function draw(){
    clear();
    if(delta<1){
        delta+=0.2;
    }else{
        delta=0;
        visitedRoutes.push(allCoordinates[coordinate]);
        coordinate++;
        drawRoute();
    }

    origin = myMap.latLngToPixel(allCoordinates[coordinate][1], allCoordinates[coordinate][0]);
    originVector = createVector(origin.x, origin.y);
    destination = myMap.latLngToPixel(allCoordinates[coordinate+1][1], allCoordinates[coordinate+1][0]);
    destinationVector = createVector(destination.x, destination.y);
    taxiPosition = originVector.lerp(destinationVector,delta);
    //console.log(taxiPosition.x, taxiPosition.y);
    noStroke();
    fill(255,255,0);
    ellipse(Number(taxiPosition.x), Number(taxiPosition.y), 7,7);
}

function drawRoute(){
    clear();
    stroke(0,0,255,200);
    strokeWeight(5);
    if(visitedRoutes.length>0){
        noFill();
        beginShape();
        visitedRoutes.forEach(function (e){
            var pos = myMap.latLngToPixel(e[1],e[0]);
            vertex(pos.x,pos.y);
        })
        endShape();
    }
}