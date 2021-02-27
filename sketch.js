var road,road_image;
var runner, runner_image;
var runner_collided;
var cash, cash_image, diamond, diamond_image;
var jwell, jwell_image, ruby, ruby_image;
var sword, sword_image;
var police, police_image;
var gameover, gameover_image;
var edeges;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  //loading images
  
  road_image = loadImage("Road.png");
  
  //loading animation
  runner_image = loadAnimation("Runner-1.png","Runner-2.png");
  
  //loading the obstacle and reward images
  
  cash_image = loadImage("cash.png");
  
  diamond_image = loadImage("diamonds.png");
  
  jwell_image = loadImage("jwell.png");
  
  sword_image = loadImage("sword.png");
  
  gameover_image = loadImage("gameover.png");
  
  runner_collided = loadAnimation("Runner-1.png");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
//moving background
  road = createSprite(windowWidth/2,200);
  road.addImage(road_image);
  road.scale = 1;
  road.velocityY = 5;

  
//creating boy running
  runner = createSprite(windowWidth/2,windowHeight-10);
  runner.addAnimation("SahilRunning",runner_image);
  runner.addAnimation("sahilCollided", runner_collided);
  runner.scale=0.08;
  
  
  //creating groups

  cashgroup = createGroup();
  diamondgroup = createGroup();
  jwellerygroup = createGroup();
  swordgroup = createGroup();
  policegroup = createGroup();

}

function draw() {

  background("white");
  

  if (cashgroup.isTouching(runner)) {
    cashgroup.destroyEach();
    score = score+5;
  }
  else if (diamondgroup.isTouching(runner)) {
    diamondgroup.destroyEach();
    score = score+10
      
  }
  else if(jwellerygroup.isTouching(runner)){
    jwellerygroup.destroyEach();
    // gameState = END;
    score = score+20;
      
     }
  //need to ask ma'am about this.
  else{
    if(swordgroup.isTouching(runner)) {
      swordgroup.destroyEach();
      jwellerygroup.destroyEach();
      diamondgroup.destroyEach();
      cashgroup.destroyEach();
      gameState = END;
        
    }
  }
    
  if(gameState===PLAY){
   //code to reset the background
    if(road.y > 400 ){
      road.y = windowHeight/2;
    }
        
  //mouse controle for runner
    runner.x = World.mouseX;
      //edges
    edges= createEdgeSprites();
    runner.collide(edges);
      
    createtreasure();
    createobstacle();
    }
  
  else if(gameState===END){
    runner.changeAnimation("sahilCollided");
    road.velocityY = 0;
        
    var gameover = createSprite(windowWidth/2,200);
    gameover.addImage(gameover_image);
      
    cashgroup.setVelocityEach(0,0);
    jwellerygroup.setVelocityEach(0,0);
    diamondgroup.setVelocityEach(0,0);
    swordgroup.setVelocityEach(0,0);
    
    // cashgroup.setLifetimeEach(-1);
    // jwellerygroup.setLifetimeEach(-1);
    // diamondgroup.setLifetimeEach(-1);
    
      
    if (keyDown("space")){
      gameState = PLAY;
    }
  }

  drawSprites();
  textSize(20);
  fill("black");
  text("Treasure Collected : "+ score,(windowWidth/2)-150,30);

}

function createtreasure() {
  if (World.frameCount % 138 == 0) {
    var cash = createSprite(Math.round(random(50, windowWidth-50),0));
    cash.addImage(cash_image);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 300;
    cashgroup.add(cash);
    cash.setCollider("circle",0,0,30);
  }

  if (World.frameCount % 177 == 0) {
    var diamond = createSprite(Math.round(random(50, windowWidth-50),0));
    diamond.addImage(diamond_image);
    diamond.scale=0.03;
    diamond.velocityY = 3;
    diamond.lifetime = 300;
    diamondgroup.add(diamond);
    diamond.setCollider("circle",0,0,30);

  }

  if (World.frameCount % 87 == 0) {
    var jwell = createSprite(Math.round(random(50, windowWidth-50),0));
    jwell.addImage(jwell_image);
    jwell.scale=0.13;
    jwell.velocityY = 3;
    jwell.lifetime = 300;
    jwellerygroup.add(jwell);
    jwell.setCollider("circle",0,0,30);
    
    }
}

function createobstacle(){
  if (World.frameCount % 157 == 0) {
    var sword = createSprite(Math.round(random(50, windowWidth-50),0));
    sword.addImage(sword_image);
    sword.scale=0.1;
    sword.velocityY = 3;
    sword.lifetime = 300;
    swordgroup.add(sword);
    sword.setCollider("circle",0,0,30);
    sword.debuge = true;
    
  }
}