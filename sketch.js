var bear, bearAni,obstacleGroup, obstacle1, obstacle2, obstacle3, bg, bgImg, gameover,restart,gameoverimg,restartimg, ground, gamestate;
var CarrotGroup, CarrotImage;
var score=0;
var diesound, jumpsound, checkpointsound;

function preload(){
bearAni = loadAnimation("b1.png", "b2.png","b3.png", "b4.png", "b5.png","b6.png","b7.png","b8.png");

  restartimg = loadImage("restartbtn.png");
obstacle1 = loadImage("image.png");
obstacle2 = loadImage("rocks.png");
obstacle3 = loadImage("rock.png");
bgImg = loadImage("jungle.png");
  CarrotImage = loadImage("carrot.png");
  diesound = loadSound("die.mp3");
 checkpointsound = loadSound("checkPoint.mp3");
  jumpsound = loadSound("jump.mp3");
  
}

function setup() {
 createCanvas(windowWidth, windowHeight);
  
gamestate = "play";  
  
bg = createSprite(350, 150, 4000, 400);
bg.addImage(bgImg);
bg.scale =1.0;
bg.velocityX = -5;
bg.x = bg.width/2;

obstacleGroup = new Group();  
  carrotGroup = new Group();
  
bear = createSprite(100, 300, 50, 50 );
bear.addAnimation("moving", bearAni);
bear.scale = 0.8;
  
ground = createSprite(360, 345, 900,10);
ground.visible = false;

 //bear.debug = true ;
bear.setCollider("circle", 0, 0, 40);
//obstacleGroup.debug = true; 
  

  
restart = createSprite(250, 160 );
restart.addAnimation("restart", restartimg);
restart.scale = 0.1;
restart.visible=false;
  
  
  
}

function draw() { 
  background("green");
  
              if(gamestate === "play")
              {

              if(bg.x <10){
                bg.x = bg.width/2
              }  

             if(carrotGroup.isTouching(bear)){
                    carrotGroup.destroyEach();
                  score = score + 1;
              }
             

              if(keyDown("space")&& bear.y>=300){
                bear.velocityY = -15;
              }

              if(bear.y<300){
               bear.velocityY = bear.velocityY+0.8; 
              }

              if(bear.isTouching(ground)){
                bear.velocityY = 0;

                if(keyDown("space")){
                  bear.velocityY = -15
                  jumpsound.play();
                }

              }
                
               spawnObstacles(); 
                spawncarrots();

              if(obstacleGroup.isTouching(bear)){
                gamestate = "end";
                diesound.play();
              }
  
  if (score>0 && score%5 === 0){
     checkpointsound.play();
    }
  
         }
         else if(gamestate==="end"){

                       background(0);
                      bear.visible = false;
                      bg.visible = false;
                        restart.visible=true;

                       obstacleGroup.destroyEach();
                        carrotGroup.destroyEach();

                       stroke("yellow");
                       textSize(20); 
                       text("GAME OVER",200, 100 );
           
           
                       if(mousePressedOver(restart))                         {
                         reset();
                         }
           
           
                      }
   drawSprites();
   stroke("white");
   textSize(20);
   fill("white");
   text("Score "+score,300, 50 );
}

function spawncarrots() {
  //write code here to spawn the food
  if (frameCount % 120 === 0) {
     carrot = createSprite(600,250,40,10);
    carrot.y = random(120,200);    
    carrot.addImage(CarrotImage);
    carrot.scale = 0.3;
    carrot.velocityX = -5;
     //assign lifetime to the variable
    carrot.lifetime = 300;
    bear.depth = carrot.depth + 1;
    
    //add each carrot to the group
    carrotGroup.add(carrot);
  }
}



function reset()
{
  gamestate="play";
  restart.visible=false ;
  bear.visible = true;
  bg.visible = true;
 
  score=0;
}

function spawnObstacles(){
 if (frameCount % 100 === 0){
   obstacle = createSprite(800,320,10,40);
   obstacle.velocityX = -6;
 obstacle.scale = 0.2;
   
 obstacle.debug = true;  
  obstacle.setCollider("rectangle", 0, 0, 200, 300)
   obstacleGroup.add(obstacle);    
   
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
              default: break;
         
              
    }}
  
  
 }