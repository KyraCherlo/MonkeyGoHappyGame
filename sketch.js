
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var ground;
var PLAY=1;
var END=0;
var gameState=PLAY; 
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  ground=createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  monkey=createSprite(80,315,30,30);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  obstacleGroup= new Group();
  FoodGroup= new Group();
  score=0;
}


function draw() {
  background("white");
  stroke("white");
  textSize(20);
  fill("black");
  text("Survival Time: " + score,200,50);
  score=score+Math.round(getFrameRate()/60);
  if (gameState === PLAY){
    if (ground.x<0){
  ground.x=ground.width/2;
  } 
  if (keyDown("space") && monkey.y >= 314.3){
    monkey.velocityY=-16;
    
  }
  monkey.velocityY=monkey.velocityY+0.9;
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
  }
    if (obstacleGroup.isTouching(monkey)){
      monkey.velocityY=0;
      ground.velocityX=0;
      obstacleGroup.setVelocityXEach(0);
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      gameState=END;
    }
  monkey.collide(ground);
  console.log(monkey.y);
  obstacles();
  bananas();
drawSprites();
  }
  else if(gameState === END){
    background("black");
    stroke("orange");
    textSize(30);
    fill("orange");
    text("GAME OVER",130,200);
  }
  
}
function obstacles(){
  if (frameCount%300===0){
    obstacle= createSprite(400,350,10,10);
    obstacle.velocityX=-6;
    obstacle.lifetime=70;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.1;
    obstacle.y=ground.y-20;
    obstacleGroup.add(obstacle);
  }
}
function bananas(){
  if (frameCount%80 === 0){
    banana=createSprite(400,200,10,10);
    banana.y=Math.round(random(120,200));
    banana.velocityX=-6;
    banana.addImage(bananaImage);
    banana.lifetime=70;
    banana.scale=0.1;
    FoodGroup.add(banana);
  }
}




