var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var cloud, cloudImage, obstacle1, obstacle2;
var obstacle3, obstacle4, obstacle5, obstacle6;
var gameOver, restart, score, gameState;  
var die, jump, check;
function preload(){
trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
trex_collided = loadImage("trex_collided.png");
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");  
obstacle4 = loadImage("obstacle4.png");  
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");  
restartImage = loadImage("restart.png");
gameOverImage = loadImage("gameOver.png");
die = loadSound("die.mp3");
check = loadSound("checkPoint.mp3");
jump = loadSound("jump.mp3");
gameState = "play";
}

function setup(){
  createCanvas(600, 200);
  trex = createSprite(50, 180, 20, 50);
  trex.addAnimation("running", trex_running); 
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  score = 0;
  console.log(trex.y);
  ground = createSprite(200, 180, 400, 20);
  ground.addImage("moving", groundImage);
  
  ground.x = ground.width/2;
  invisibleGround = createSprite(200, 190, 400, 20);
  invisibleGround.visible = false;
  gameOver = createSprite(300, 100, 40, 40);
  gameOver.visible = false;
  gameOver.addImage("gameOvering", gameOverImage);
  gameOver.scale = 0.5;
  restart = createSprite(300, 140, 20, 20);
  restart.visible = false;  
  restart.addImage("restarting", restartImage);
  restart.scale = 0.5;
  cGroup = new Group();
  oGroup = new Group();
}

function draw() {
  background(180);
  textSize(20);
  text("Score: " + score, 20, 20);
  trex.collide(invisibleGround);
  if (gameState === "play"){
  if (frameCount%20 === 0){
    score = score + 1;
  }
  if (score > 0 && score%100 === 0){
    check.play();
  }
  ground.velocityX = -(6 + 3 * score/100);
  if (ground.x < 0){
        ground.x = ground.width/2;
  }
  if (trex.y >= 140 && keyDown("space")){
      trex.velocityY =  -10;
      jump.play();
      }
  trex.velocityY = trex.velocityY + 0.5;
  spawnObstacles();
  spawnClouds();
  if (oGroup.isTouching(trex)) {
      gameState = "end";
      die.play();
    }
  }
  else if (gameState === "end"){
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    oGroup.setVelocityXEach(0);
    oGroup.setLifetimeEach(-1);
    cGroup.setVelocityXEach(0);
    cGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided", trex_collided);
    if (mousePressedOver(restart)) {
      reset();
    }
  }
  drawSprites();
}
function reset(){
  gameOver.visible = false;
  restart.visible = false;
  gameState = "play";
  oGroup.destroyEach();
  cGroup.destroyEach();
  trex.changeAnimation("running", trex_running);
  score = 0;
}
function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3: obstacle.addImage(obstacle3);
      break;
      case 4: obstacle.addImage(obstacle4);
      break;
      case 5: obstacle.addImage(obstacle5);
      break;
      case 6: obstacle.addImage(obstacle6);
      break;
      default:break;
    }
    //assign scale and lifetime to the obstacle       
    obstacle.scale = 0.55;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    oGroup.add(obstacle);
  }
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
     //assign lifetime to the variable
    cloud.lifetime = 200; 
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    //add each cloud to the group
    cGroup.add(cloud);
  } 
}