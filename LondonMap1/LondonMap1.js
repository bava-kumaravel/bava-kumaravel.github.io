let canvas;
let myMap;
const key = 'pk.eyJ1IjoiYmF2YS1rdW1hcmF2ZWwiLCJhIjoiY2psNXg0NTI1Mml0cjNxcDJ1d3Yyb3FuNCJ9.fPDDUsub66z1ItHK9dCVuw';
const mappa = new Mappa('Mapbox', key);
var data;

//Variables to store the coordinate data
let boundaryCoordinates;

let boroughboundDict ={};
let boroughNames =[];

const options={
    lat:51.49,
    lng:-0.090468,
    zoom:10,
    studio: true,
    style:'mapbox://styles/mapbox/light-v9',
    
};

function setup(){
    canvas = createCanvas(800
    ,500);
    myMap = mappa.tileMap(options);
    myMap.overlay(canvas);

    
    data.features.forEach(function(feature){
        boroughNames.push(feature.properties["NAME"]);
        boroughboundDict[feature.properties["NAME"]]=feature.geometry["coordinates"];
    })
    //console.log(drawCoordinates);
    //console.log(drawCoordinates.length);
    //console.log(data.features.length);
    console.log(boroughNames);
    console.log(boroughboundDict);
    
    //myMap.onChange(drawBounds);
}

function preload(){
    data = loadJSON('data/London_BoroughBoundaries.geojson');
}

function draw(){
    
    clear();
    stroke(10,10,10,100);
    strokeWeight(0.5);
    fill(255,255,0,50);

    for(let i=0;i<boroughNames.length;i++){
        
        let drawCoordinates = [];
        beginShape();
        //console.log(boroughboundDict[boroughNames[i]]);
        boroughboundDict[boroughNames[i]].forEach(function(a){
            a.forEach(function(b){
                b.forEach(function(c){
                    //console.log(c);
                    var pos = myMap.latLngToPixel(c[1],c[0]);
                    vertex(pos.x,pos.y);
                    //console.log(pos);
                })
                
            })
            
        })
        endShape();
    }
}
