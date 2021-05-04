//Game States
var PLAY=1;
var END=0;
var gameState=1;

var knife,knifeImage;
var alien,alien1Image;
var fruit,fruit1Image,fruit2Image,fruit3Image,fruit4Image;


function preload(){
  
  knifeImage=loadImage("knife.png");
  alien1Image = loadAnimation("alien1.png","alien2.png");
  
  fruit1Image = loadImage("fruit1.png");
  fruit2Image = loadImage("fruit2.png");
  fruit3Image = loadImage("fruit3.png");
  fruit4Image = loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  knifeSwooshSound = loadSound("knifeSwoosh.mp3");
 gameOverSound = loadSound("gameover.mp3");
}

function setup() {
  createCanvas(600, 600);
  
  //creating sword
   knife=createSprite(40,200,20,20);
   knife.addImage(knifeImage);
   knife.scale=0.7;
  
 
  //set collider for sword
  knife.setCollider("rectangle",0,0,40,40);

   gameOver=createSprite(280,300,20,20);
   gameOver.addImage(gameOverImage);
   gameOver.scale=1.9;
  
  score=0;
  
 // creating Groups 
  fruitsGroup = new Group();
  alienGroup = new Group();
  
}


function draw() {
  background("lightblue");
  
  
if(gameState===PLAY){
  
     alien();
  fruits();
    gameOver.visible = false;
  
  if(knife.isTouching(fruitsGroup)){
      fruitsGroup.destroyEach();
      knifeSwooshSound.play();
      score = score+2;
   }  

    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
  
   if(alienGroup.isTouching(knife)){
     gameOverSound.play();
    gameState = END;
     
  }
}
   else  if(gameState === END){
    
        knife.destroy();
        alienGroup.destroyEach();
        gameOver.visible = true;
        fruitsGroup.destroyEach();
  }
  

 
  
  drawSprites();
  
  fill("white");
  textSize(25),
  text("Score :"+score, 250, 40);
}
  function alien(){
    if(frameCount % 130 == 0){
      alien1 = createSprite(0,Math.round(random(50,550)));
    alien1.addAnimation("alien",alien1Image); 
    alien1.velocityX = 3;
      alien1.lifetime = 580;
    alien1.scale = 0.9;
      alienGroup.add(alien1);
    }
    
  }
  
  function fruits(){
    if(frameCount % 80 == 0){
      fruit = createSprite(600,Math.round(random(100,580)),20,20);
      fruit.scale = 0.2;
     
      rand = Math.round(random(1,4));
      if(rand == 1){
        fruit.addImage(fruit1Image);
      } 
      else if(rand == 2){
        fruit.addImage(fruit4Image);
    } else if(rand == 3){
      fruit.addImage(fruit2Image);
    }else if(rand == 4){
      fruit.addImage(fruit3Image);
    }
      
      knife.setCollider("circle",0,0,30);
      fruit.y = Math.round(random(50,340));
      
      fruit.velocityX = -7;
      fruit.lifetime = 100;
      
      knife.depth = fruit.depth+1;
      
      fruitsGroup.add(fruit);
    }
    
  }