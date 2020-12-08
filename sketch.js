//Creating global variables
var dog, dogIMG, happyDogIMG, happyDog;
var foodS, foodStock;
var database;

function preload(){
  //loading images
  dogIMG = loadImage('images/dogImg.png');
  happyDogIMG = loadImage('images/dogImg1.png');
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250, 350, 30, 30);
  dog.addImage(dogIMG);
  dog.scale = 0.3;

  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock, showError);
  
}


function draw() {  
  background("green");
   if (keyWentDown(UP_ARROW)){
     writeStock(foodS);
     dog.addImage(happyDogIMG);
   }

  drawSprites();
  
  textSize(15);
  fill("white");
  text("Food remaining: "+foodS, 150, 100);
  text("NOTE: Press The UP_ARROW key To Feed Tannie Milk", 60, 20);
 
}

function writeStock(x){
  if (x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }

  database.ref('/').update({
    Food: x
  })
}

function readStock(data){
  foodS = data.val();
}

function showError(){
  console.log("error");
}


