const Engine=Matter.Engine;
const World=Matter.World;
const Bodies=Matter.Bodies;

var engine,world;
var canvas;
var spaceship,spaceshipImage;

var backgroundImage;

var scene;

var edges; 

var spacecraftsgroup;

var spacecrafts,spacecraftImage ;

var score=0;

var sound;
var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
 spaceshipImage=loadImage("Player1225.webp");
 
 backgroundImage=loadImage("Space10.jpg");
 spacecraftImage=loadImage("space1.png");
 sound=loadSound("sound1.mp3");
}

function setup() {
  
// canvas= createCanvas(displayWidth-10,displayHeight-200);
 createCanvas(1200,1000);
  scene=createSprite(0,0,1200,1000);
  scene.addImage(backgroundImage);
  scene.scale=3.5;
  scene.x=scene.width/2;
  scene.velocityX=+3;

  engine=Engine.create();
  world=engine.world;

  spaceship=createSprite(displayWidth/2,600,100,50);
  spaceship.addImage(spaceshipImage);
  spaceship.scale=0.4;
  
  spacecraftsgroup=new Group();
  
}

function draw() {
  background(0); 
  
  //scene.velocityX=+3; 

  if(scene.x<0){
  scene.x=scene.width/2;

  }

  if(gameState===PLAY){
    spaceship.velocityY=0;
    spaceship.velocityX=0;

    
  if(keyDown("UP_ARROW")){

    spaceship.velocityY=-3;
    spaceship.velocityX=0;
  }

  if(keyDown("DOWN_ARROW")){

    spaceship.velocityY=3;
    spaceship.velocityX=0;
  }

  if(keyDown("LEFT_ARROW")){

    spaceship.velocityY=0;
    spaceship.velocityX=-3;
  }
  if(keyDown("RIGHT_ARROW")){

    spaceship.velocityY=0;
    spaceship.velocityX=3;
  }

  if(spacecraftsgroup.isTouching(spaceship)){
    sound.play();
    score=score+1;
    spacecrafts.destroy();

    
    
    }

    edges=createEdgeSprites();
    spaceship.bounceOff(edges);
    
  spawnSpaceCrafts();

    if(spacecraftsgroup.isTouching(spaceship)){

    gameState=END; 
    fill("white");
    textSize(80);
   text("Game Over", 1500,1000);
    }
  }
   
   if(gameState===END){
    spacecrafts.velocityX=0;
    spacecrafts.velocityY=0;

    spaceship.velocityX=0;
    spaceship.velocityY=0;

    scene.velocityX=0;
    scene.velocityY=0;


   }
   

  Engine.update(engine);
 

 
 
  drawSprites();

  fill("white");
  textSize(40);
 text("Hits:" +score,1000,50);
}

function spawnSpaceCrafts(){
if(frameCount%80===0){
  spacecrafts=createSprite(1000,100,200,100);
  spacecrafts.x=Math.round(random(80,2000));
  spacecrafts.addImage(spacecraftImage);
  spacecrafts.scale=0.5
  
   spacecrafts.velocityY=3;
   spacecrafts.lifetime=150;
   spacecraftsgroup.add(spacecrafts);

}


}