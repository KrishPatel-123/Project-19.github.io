var rocketImg, rocket

var meteorImg, meteor, meteorsGroup

var starImg, star, starsGroup

var spaceImg, space

var restartImg, restart

var gameOverImg, gameOver

var score=0;

var gameState = "play";

function preload(){
    rocketImg = loadImage("rocket.png")
    meteorImg = loadImage("meteor.png")
    starImg = loadImage("star.png")
    spaceImg = loadImage("space.png")
    restartImg = loadImage("restart.png")
    gameOverImg = loadImage("gameover.png")
}

function setup()
{
  createCanvas(windowWidth,windowHeight)

  space = createSprite(width/2,height/2)
  space.addImage(spaceImg)

  rocket = createSprite(width/2,height/2+200)
  rocket.addImage(rocketImg)
  rocket.scale=0.3;

  restart = createSprite(width/2,height/2+75)
  restart.addImage(restartImg)
  restart.scale=0.5

  gameOver = createSprite(width/2,height/2-50)
  gameOver.addImage(gameOverImg)
  gameOver.scale=0.3

  meteorsGroup = createGroup();
  starsGroup = createGroup();
}

function draw() {

    console.log(gameState)

    if (gameState === "play"){
        
        create_meteors();

        if (keyDown("left")){
            rocket.x=rocket.x-5
        }
        if (keyDown("right")){
            rocket.x=rocket.x+5
        }
        if (keyDown("up")){
            rocket.y=rocket.y-5
        }
        if (keyDown("down")){
            rocket.y=rocket.y+5
        }

        if(rocket.isTouching(starsGroup)){
            score=score+100;
            star.destroy();
        }

        if(rocket.isTouching(meteorsGroup)){
            gameState="end"
        }

        gameOver.visible = false;
        restart.visible = false;

        

        
    }

    if (gameState === "end"){
        console.log("hello")
        gameOver.visible=true;
        restart.visible=true;

        //meteorsGroup.setVelocityYEach(0);
        //starsGroup.setVelocityYEach(0);

        //meteorsGroup.destroyEach();
        //starsGroup.destroyEach();

        if(mousePressedOver(restart)){
            reset();
        }
    
    }
    drawSprites();
    textSize(30)
    fill("white")
    text("Score = "+score,width/2+500,height/2-300)
}

function create_meteors(){
    if (frameCount%250 === 0){
    meteor = createSprite(Math.round(random(width/2-500,width/2+500)),0)
    meteor.addImage(meteorImg)
    meteor.rotation=-45;
    meteor.scale=0.5;
    meteor.velocityY=5;
    meteor.debug=true;
    meteor.setCollider("circle",0,0,100)

    star = createSprite(Math.round(random(width/2-500,width/2+500)),0)
    star.addImage(starImg)
    star.scale=0.4;
    star.velocityY=5;

    meteorsGroup.add(meteor);
    starsGroup.add(star);
    }
}

function reset(){
    gameState = "play"

    score=0;

    meteorsGroup.destroyEach();
    starsGroup.destroyEach();

    restart.visible=false;
    gameOver.visible=false;
}