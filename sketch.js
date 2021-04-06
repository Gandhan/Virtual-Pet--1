//Create variables here
var dog, happyDog, database, foodS, foodStock,happyDogImg,dogImg;
function preload()
{
	//load images here
  happyDogImg  = loadImage("dogImg1.png");
  dogImg = loadImage("dogImg.png"); 
}

function setup() {
	createCanvas(500, 500);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.5;
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on('value',readStock);

  
}


function draw() {  
  background(46, 139, 87);
 
  if(keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

 
 
  drawSprites();
  //add styles here
  textSize(15);
  fill ("white");
  stroke (2);
  text ("Note : Press Up Arrow to feed drago Milk!",150,20);
  text("Food Remaining : "+ foodS,250,40);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {

  if(x <= 0) {
    x=0;
  }
  else {
    x=x-1;
  }
  database.ref('/').update({
    Food : x
  })

}


