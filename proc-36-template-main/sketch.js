var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feeddog;
var lastfeed;
var feedtime;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feeddog=createButton("Feed Dog")
  feeddog.position(700,95)
  feeddog.mousePressed(feedDog)


}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
  feedtime=database.ref("feedtime")
  feedtime.on("value",function(data){

    lastfeed=data.val()
  })
 
  //write code to display text lastFed time here
 fill(255)
 textSize(20)
  if(lastfeed>=12){

    text("lastfeed: "+lastfeed%12+"pm",300,30)

  } else if(lastfeed===0){

    text("lastfeed: +12am",300,30)
  } else {

    text("lastfeed: "+lastfeed+"am",300,30)

  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
var foodstockvalue=foodObj.getFoodStock()
if(foodstockvalue<=0){

  foodObj.updateFoodStock(foodstockvalue*0)
}
else {
  foodObj.updateFoodStock(foodstockvalue-1)

}

database.ref("/").update({Food:foodObj.getFoodStock(),
feedtime:hour()})

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
