class aSprite
{
     // Constructor
     constructor(x, y, imageSRC, spType)
     {
     this.zindex = 0;
     this.x = x;
     this.y = y;
     this.sType = spType;
     this.sImage = new Image();
     this.sImage.src = imageSRC;
     }

     // Getter
     get xPos(){
     return this.x;
     }

     get yPos(){
     return this.y;
     }

     // Setter
     set xPos(newX){
     this.x = newX;
     }

     set yPos(newY){
     this.y = newY;
     }

    //render method with width and height
    renderWH(width, height)
    {
    canvasContext.drawImage(this.sImage,this.x, this.y, width, height );
    }

     // Scrolling background method
     scrollBKWH(xPos, delta, width, height)
     {
     canvasContext.save();
     canvasContext.translate(xPos, delta);
     canvasContext.drawImage(this.sImage,0, 0, width, height);
     canvasContext.drawImage(this.sImage,0, this.sImage.height, width, height);
     canvasContext.drawImage(this.sImage,0, -this.sImage.height, width, height);
     canvasContext.restore();
     }

     // sprite position method
     sPos(newX,newY)
     {
     this.x = newX;
     this.y = newY;
     }
 }












//variables
var canvas;
var canvasContext;
var BGtravel=0;
var enemyCar1Travel=-50;
var enemyCar2Travel=-50;
var enemyCar3Travel=-50;
var roadBlock1Travel=-750;
var roadBlock2Travel=-1000;
var playerCar;
var enemyCar1;
var enemyCar2;
var enemyCar3;
var roadBlock1;
var roadBlock2;
var explode;
var bullet;
var crosshair;
var fire=false;
var lastPt=null;
var elapsed;
var gameOver=false;
var gameOverScene=false;
var bulletTravel;
var tempPlayerXPos=-200;
var bulletCount=3;
var ammobox;
var ammoboxTravel=-2000;
var score=0;
var nextbutton;
var endSceneBG;
var retry;
var startscene;
var gameStart=false;
var startbutton;
var audioBG1;
var audioBG2;
var audioBG3;
var audioButton;
var audioGet;
var audioFire;
var audioExplode;
var bg2stop=true;
var introScene=false;
var intro;
var introNextButton;
var leftArrow;
var rightArrow;
var gamePadTrigger=false;
var triggerOnce=false;
var speed=3;
var touchButton;
var gamePadButton;
var carW;
var carH;
var roadBlockW;
var roadBlockH;
var ammoboxW;
var ammoboxH;
var recButtonW;
var recButtonH;
var circleButtonW;
var circleButtonH;
var rocketW;
var rocketH;
var controlButtonW;
var controlButtonH;
var explodeW;
var explodeH;
var fontSize;

//set canvas width and height equal to the size of screen
 function resizeCanvas()
 {
     canvas.width = window.innerWidth;
     canvas.height = window.innerHeight;
 }


//function that call by html body on load
 function load()
 {
     canvas = document.getElementById('gameCanvas');
     canvasContext = canvas.getContext('2d');
     init();
     gameStart=true;
 }


//a function that set up and initialise many objects, listeners and values
 function init()
 {

     if (canvas.getContext)
     {
         //Set Event Listeners for window, mouse and touch

         window.addEventListener('resize', resizeCanvas, false);
         window.addEventListener('orientationchange', resizeCanvas, false);

         canvas.addEventListener("touchstart", touchDown, false);
         canvas.addEventListener("touchmove", touchXY, true);
         canvas.addEventListener("touchend", touchUp, false);

         document.body.addEventListener("touchcancel", touchUp, false);

         resizeCanvas();



        //set up sprites
        bkgdImage = new aSprite(0,0,"testroad.png","Generic");
        playerCar = new aSprite(100,0,"bluecar.png","Generic");
        enemyCar1 = new aSprite(0,0,"redcar.png","Generic");
        enemyCar2 = new aSprite(0,0,"redcar.png","Generic");
        enemyCar3 = new aSprite(0,0,"redcar.png","Generic");
        roadBlock1 = new aSprite(0,0,"roadBlock.png","Generic");
        roadBlock2 = new aSprite(0,0,"roadBlock.png","Generic");
        explode = new aSprite(0,0,"Explode.png","Generic");
        bullet = new aSprite(0,0,"bullet.png","Generic");
        crosshair = new aSprite(0,0,"crosshair.png","Generic");
        ammobox=new aSprite(0,0,"ammobox.png","Generic");
        nextbutton=new aSprite(0,0,"nextbutton.png","Generic");
        endSceneBG=new aSprite(0,0,"endscene.png","Generic");
        retry=new aSprite(0,0,"retry.png","Generic");
        startscene=new aSprite(0,0,"startscene.png","Generic");
        startbutton=new aSprite(0,0,"start.png","Generic");
        intro=new aSprite(0,0,"intro.png","Generic");
        introNextButton=new aSprite(0,0,"nextbutton.png","Generic");
        leftArrow=new aSprite(0,0,"leftArrow.png","Generic");
        rightArrow=new aSprite(0,0,"rightArrow.png","Generic");
        touchButton=new aSprite(0,0,"touch.png","Generic");
        gamePadButton=new aSprite(0,0,"gamepad.png","Generic");

        //set up audios
        audioBG1=new Audio("bg1.wav");
        audioBG2=new Audio("bg2.mp3");
        audioBG3=new Audio("bg3.mp3");
        audioButton=new Audio("button.mp3");
        audioGet=new Audio("get.wav");
        audioFire=new Audio("fire.wav");
        audioExplode=new Audio("fire.wav");

        //initialise objects position
        playerCar.sPos(canvas.width/2,canvas.height-carH);
        bullet.sPos(-500,-500);
        enemyCar1.x=Math.random()*canvas.width;
        enemyCar2.x=Math.random()*canvas.width;
        enemyCar3.x=Math.random()*canvas.width;
        roadBlock1.x=Math.random()*canvas.width;
        roadBlock2.x=Math.random()*canvas.width;

        //initialise objects y position
        BGtravel=0;
        enemyCar1Travel=-50;
        enemyCar2Travel=-50;
        enemyCar3Travel=-50;
        roadBlock1Travel=-750;
        roadBlock2Travel=-1000;
        ammoboxTravel=-2000;

        //initialise several variables values
        fire=false;
        lastPt=null;
        gameOver=false;
        gameOverScene=false;
        tempPlayerXPos=-200;
        bulletCount=3;
        score=0;
        startTimeMS = Date.now();

        //objects size
        carW=canvas.width/10;
        carH=canvas.height/9;
        roadBlockW=canvas.width/5;
        roadBlockH=canvas.height/8;
        ammoboxW=canvas.width/7.5;
        ammoboxH=canvas.height/9;
        recButtonW=canvas.width/2;
        recButtonH=canvas.height/10;
        circleButtonW=canvas.width/8;
        circleButtonH=canvas.width/8;
        rocketW=canvas.width/12;
        rocketH=canvas.height/11;
        controlButtonW=canvas.width/7;
        controlButtonH=canvas.width/7;
        explodeW=canvas.width/3;
        explodeH=canvas.width/3;
        fontSize=canvas.width*(60/1000);
        //default text style
        styleText('white', 'bold '+ fontSize+'pt Courier New', 'center', 'middle');

        //call game loop to start the game
        gameLoop();

     }
 }




//The main game loop function
 function gameLoop()
 {

//start scene
//render start scene background and player start scene music
  if(gameStart)
     {

     requestAnimationFrame(gameLoop);
     audioBG1.play();
     startscene.renderWH(canvas.width, canvas.height);

    //set up text style for title and draw text, set start button position and render it
     if(!introScene)
     {
     styleText('red', 'bold '+ fontSize+'pt Courier New', 'center', 'middle');
     canvasContext.fillText("Dangerous Racing", canvas.width/2, canvas.height/5);
     startbutton.sPos(canvas.width/2-recButtonW/2, canvas.height/3);
     startbutton.renderWH(recButtonW,recButtonH);

        //play button sound and trigger intro scene when press the start button
         if(lastPt!=null)
         {
          if(lastPt.x>startbutton.x && lastPt.x<startbutton.xPos+recButtonW &&lastPt.y>startbutton.y && lastPt.y<startbutton.y+recButtonH)
             {
             audioButton.play();
             introScene=true
             }
         }
     }

      //set up intstruction image and next button position, and render them
      if(introScene)
         {
          introNextButton.sPos(canvas.width-circleButtonW, 0);
          introNextButton.renderWH(circleButtonW,circleButtonH);
          intro.sPos(0, canvas.height/5);
          intro.renderWH(canvas.width,canvas.height/1.5);

          //pause start scene background music and call init() function to re-initialise the data and set start scene triggers to false to start the actual gameplay
             if(lastPt!=null)
                  {
                   if(lastPt.x>introNextButton.x && lastPt.x<introNextButton.xPos+circleButtonW &&lastPt.y>introNextButton.y && lastPt.y<introNextButton.y+circleButtonH)
                      {
                      audioBG1.pause();
                      audioButton.play();
                      bg2stop=false;
                      init();
                      gameStart=false;
                      introScene=false;
                      }
                   }

         }
     }



    //main game scene
    //set up the text style for the game scene and start the game scene background music
    if(!gameStart&&!gameOver)
    {
            styleText('yellow', 'bold '+ fontSize+'pt Courier New', 'center', 'middle');
            audioBG1.pause();
            if(!bg2stop)
            {
            audioBG2.play();
            }


        //set up the background scrolling and speed
         elapsed = (Date.now() - startTimeMS)/100;
         BGtravel += elapsed * 100;

         if (BGtravel >bkgdImage.sImage.height)
         {
            BGtravel = 0;
         }

        //setup the enemy cars (red cars), road blocks and ammo box travel speed , reset travel distance when they reach the end of the canvas, and reset random x position when travel distance return to default value
          enemyCar1Travel += elapsed * 20;
          if (enemyCar1Travel > carH+canvas.height)
          {
          score++;
            enemyCar1Travel = -50;
          }
          if(enemyCar1Travel==-50)
          {
          enemyCar1.x=Math.random()*canvas.width;
          }
          enemyCar1.y=enemyCar1Travel;


        enemyCar2Travel += elapsed * 50;
            if (enemyCar2Travel > carH+canvas.height)
            {
            score++;
              enemyCar2Travel = -50;
            }
            if(enemyCar2Travel==-50)
            {
            enemyCar2.x=Math.random()*canvas.width;
            }
            enemyCar2.y=enemyCar2Travel;


          enemyCar3Travel += elapsed * 30;
              if (enemyCar3Travel > carH+canvas.height)
              {
              score++;
                enemyCar3Travel = -50;
              }
              if(enemyCar3Travel==-50)
              {
              enemyCar3.x=Math.random()*canvas.width;
              }
              enemyCar3.y=enemyCar3Travel;


         roadBlock1Travel += elapsed * 100;
                if (roadBlock1Travel > roadBlockH+canvas.height)
                {
                score++;
                  roadBlock1Travel = -750;
                }
                if(roadBlock1Travel==-750)
                {
                roadBlock1.x=Math.random()*canvas.width;
                }
                roadBlock1.y=roadBlock1Travel;


           roadBlock2Travel += elapsed * 100;
                  if (roadBlock2Travel > roadBlockH+canvas.height)
                  {
                  score++;
                    roadBlock2Travel = -1000;
                  }
                  if(roadBlock2Travel==-1000)
                  {
                  roadBlock2.x=Math.random()*canvas.width;
                  }
                  roadBlock2.y=roadBlock2Travel;


            ammoboxTravel += elapsed * 100;
                if (ammoboxTravel > ammoboxH+canvas.height)
                {
                  ammoboxTravel = -2000;
                }
                if(ammoboxTravel==-2000)
                {
                ammobox.x=Math.random()*canvas.width;
                }
                ammobox.y=ammoboxTravel;


    //two differnt control types
    //if touch control has been choose, the player's car will follow the touch x position, and the crosshair icon will follow the player's car x position
    if(!gamePadTrigger)
    {
        if(lastPt!=null)
        {
        if(lastPt.y>canvas.height-carH*2)
            {
            playerCar.sPos(lastPt.x-carW/2,canvas.height-carH);
            }
        }

        crosshair.sPos(playerCar.x-carW/4,canvas.height-carH*3);
    }

    //if virtual game pad control has been choose, the arrows and crosshair buttons will appear which will stay in a fixed position, pressing arrow buttons will move the player's car
    if(gamePadTrigger)
    {
        leftArrow.sPos(0,canvas.height-controlButtonH);
        rightArrow.sPos(controlButtonW,canvas.height-controlButtonH);
        crosshair.sPos(canvas.width-controlButtonW,canvas.height-controlButtonH);

         if(lastPt!=null)
           {
               if(lastPt.x>leftArrow.x && lastPt.x<leftArrow.xPos+controlButtonW &&lastPt.y>leftArrow.y && lastPt.y<leftArrow.y+controlButtonH)
               {
                if(!(playerCar.x<=0))
                     {
                    playerCar.x-=speed;
                    }
               }
               if(lastPt.x>rightArrow.x && lastPt.x<rightArrow.xPos+controlButtonW&&lastPt.y>rightArrow.y && lastPt.y<rightArrow.y+controlButtonH)
               {
                 if(!(playerCar.x+carW>=canvas.width))
                    {
                    playerCar.x+=speed;
                    }
               }
            }
    }


        //set up the position and speed when firing a rocket, set the rocket into a fixed position when not firing
        if(fire)
        {
        bulletTravel-=elapsed*100;
        bullet.sPos(tempPlayerXPos+rocketW/4,bulletTravel);
            if(bulletTravel<=0)
            {
            fire=false;
            }
        }
        if(!fire)
        {
        bullet.sPos(-500,-500);
        bulletTravel=canvas.height-carH;
        }

        //setup the explode sprite, touch control option button and game pad control option button position
        explode.sPos(playerCar.x-explodeW/4,playerCar.y-explodeH/4);
        touchButton.sPos(canvas.width-circleButtonW*2,circleButtonH);
        gamePadButton.sPos(canvas.width-circleButtonW,circleButtonH);


        //calling other functions
        render(elapsed);
        startTimeMS = Date.now();
        requestAnimationFrame(gameLoop);
        collisionDetection();
        UI();

     }



    //end game scene
    //stop main game background music
    if(gameOver)
    {
    requestAnimationFrame(gameLoop);
    bg2stop=true;
    audioBG2.pause();

    //set up the next button position and render the next button when the user fail the game but still in the main game scene
    if(!gameOverScene)
    {
        nextbutton.sPos(canvas.width-circleButtonW, 0);
        nextbutton.renderWH(circleButtonW,circleButtonH);
    }

    //render the end scene when next button has been pressed, which will player the end scene background music, render the end scene background, change the text style for the end scene
    //, show game over and score text and set up and render the retry button
      if(lastPt!=null)
       {
        if(lastPt.x>nextbutton.x && lastPt.x<nextbutton.xPos+circleButtonW &&lastPt.y>nextbutton.y && lastPt.y<nextbutton.y+circleButtonH)
           {
                 audioButton.play();
                 audioBG3.play();
                 gameOverScene=true;
                 endSceneBG.renderWH(canvas.width, canvas.height);
                 styleText('red', 'bold '+ fontSize+'pt Courier New', 'center', 'middle');
                 canvasContext.fillText("Game Over", canvas.width/2, canvas.height/2-100);
                 canvasContext.fillText("Your Score is: "+score, canvas.width/2, canvas.height/2-20);
                 retry.sPos(canvas.width/2-recButtonW/2, canvas.height/1.5);
                 retry.renderWH(recButtonW,recButtonH);

           }

         //stop the end scene music and re-initialise the main game when clicking the retry button to allow the game to be reset.
         if(lastPt.x>retry.x && lastPt.x<retry.xPos+recButtonW &&lastPt.y>retry.y && lastPt.y<retry.y+recButtonH)
            {
                 audioButton.play();
                 audioBG3.pause();
                 bg2stop=false;
                 init();
                 speed=speed/1.15;
            }
       }
    }
 }


//render function that render all the sprites in the main game scene
 function render(delta)
 {
     canvasContext.clearRect(0,0,canvas.width, canvas.height);
     bkgdImage.scrollBKWH(0,BGtravel,canvas.width,bkgdImage.sImage.height);
     playerCar.renderWH(carW,carH);
     enemyCar1.renderWH(carW,carH);
     enemyCar2.renderWH(carW,carH);
     enemyCar3.renderWH(carW,carH);
     roadBlock1.renderWH(roadBlockW,roadBlockH);
     roadBlock2.renderWH(roadBlockW,roadBlockH);
     crosshair.renderWH(controlButtonW,controlButtonH);
     ammobox.renderWH(ammoboxW,ammoboxH);
     touchButton.renderWH(circleButtonW,circleButtonH);
     gamePadButton.renderWH(circleButtonW,circleButtonH);

     //render the rocket when fire is triggered
     if(fire)
     {
     bullet.renderWH(rocketW,rocketH);
     }

     //render arrows button when virtual game pad option has been choose
     if(gamePadTrigger)
     {
      leftArrow.renderWH(controlButtonW,controlButtonH);
      rightArrow.renderWH(controlButtonW,controlButtonH);
     }

 }


//collision detection function that include all the collision check such as car crash, rocket hits and button clicks
 function collisionDetection() {

//check collision between player's car and other enemy objects, trigger game over and explode when collided
    if((enemyCar1.x<playerCar.x+carW && enemyCar1.y+carH>playerCar.y && playerCar.x<enemyCar1.x+carW && enemyCar1.y<playerCar.y+carH)
    ||(enemyCar2.x<playerCar.x+carW && enemyCar2.y+carH>playerCar.y && playerCar.x<enemyCar2.x+carW && enemyCar2.y<playerCar.y+carH)
    ||(enemyCar3.x<playerCar.x+carW && enemyCar3.y+carH>playerCar.y && playerCar.x<enemyCar3.x+carW && enemyCar3.y<playerCar.y+carH)
    ||(roadBlock1.x<playerCar.x+carW && roadBlock1.y+roadBlockH>playerCar.y && playerCar.x<roadBlock1.x+roadBlockW && roadBlock1.y<playerCar.y+carH)
    ||(roadBlock2.x<playerCar.x+carW && roadBlock2.y+roadBlockH>playerCar.y && playerCar.x<roadBlock2.x+roadBlockW && roadBlock2.y<playerCar.y+carH))
    {
        audioExplode.play();
        explode.renderWH(explodeW,explodeH);
        gameOver=true;
        canvasContext.fillText("Game Over", canvas.width/2, canvas.height/2);
    }


//check rocket hits with enemy objects, set the enemy object's y position back to default when they got hit
    if(enemyCar1.x<bullet.x+rocketW && enemyCar1.y+carH>bullet.y && bullet.x<enemyCar1.x+carW && enemyCar1.y<bullet.y+rocketH)
      {
      score++;
      enemyCar1Travel=(-200);
      fire=false;
      }
    if(enemyCar2.x<bullet.x+rocketW && enemyCar2.y+carH>bullet.y && bullet.x<enemyCar2.x+carW && enemyCar2.y<bullet.y+rocketH)
    {
    score++;
      enemyCar2Travel=(-200);
        fire=false;
      }
    if(enemyCar3.x<bullet.x+rocketW && enemyCar3.y+carH>bullet.y && bullet.x<enemyCar3.x+carW && enemyCar3.y<bullet.y+rocketH)
    {
    score++;
      enemyCar3Travel=(-200);
        fire=false;
      }
   if(roadBlock1.x<bullet.x+rocketW && roadBlock1.y+roadBlockH>bullet.y && bullet.x<roadBlock1.x+roadBlockW && roadBlock1.y<bullet.y+rocketH)
   {
   score++;
     roadBlock1Travel=(-750);
       fire=false;
     }
    if(roadBlock2.x<bullet.x+rocketW && roadBlock2.y+roadBlockH>bullet.y && bullet.x<roadBlock2.x+roadBlockW && roadBlock2.y<bullet.y+rocketH)
    {
    score++;
      roadBlock2Travel=(-1000);
        fire=false;
      }


    //check ammo box collision with the player's car, play sound and add bullet count when collided, and set the ammo box's y position back to default value
      if(ammobox.x<playerCar.x+carW && ammobox.y+ammoboxH>playerCar.y && playerCar.x<ammobox.x+ammoboxW&& ammobox.y<playerCar.y+carH)
      {
        ammoboxTravel=-2000;
        bulletCount+=1;
        audioGet.play();
      }


    //check fire button click with the touch, trigger fire, take away 1 ammo count, set temparary player position for the rocket and play fire sound if clicked
   if(lastPt!=null)
   {
       if(lastPt.x>crosshair.x && lastPt.x<crosshair.xPos+controlButtonW &&lastPt.y>crosshair.y && lastPt.y<crosshair.y+controlButtonH)
       {
           if(bulletCount>0)
           {
            if(bullet.y<0)
             {
             bulletCount-=1;
             fire=true;
             audioFire.play();
             tempPlayerXPos=playerCar.x;
             }
           }
       }
    }


    //check control options button click
    if(lastPt!=null)
       {
           if(lastPt.x>touchButton.x && lastPt.x<touchButton.xPos+circleButtonW &&lastPt.y>touchButton.y && lastPt.y<touchButton.y+circleButtonH)
           {
                gamePadTrigger=false;
           }
            if(lastPt.x>gamePadButton.x && lastPt.x<gamePadButton.xPos+circleButtonW &&lastPt.y>gamePadButton.y && lastPt.y<gamePadButton.y+circleButtonH)
              {
                  gamePadTrigger=true;
              }
        }

}


//function that show UI text for the main game scene
function UI()
{
canvasContext.fillText("Bullet: "+bulletCount, canvas.width/4, canvas.height/15);
canvasContext.fillText("Score: "+score, canvas.width/4, canvas.height/8);
}


//function that allow setup text style
function styleText(txtColour, txtFont, txtAlign, txtBaseline)
{
canvasContext.fillStyle = txtColour;
canvasContext.font = txtFont;
canvasContext.textAlign = txtAlign;
canvasContext.textBaseline = txtBaseline;
}

//touch up event
function touchUp(evt) {
evt.preventDefault();
// Terminate touch path
lastPt=null;
}

//touch down event
function touchDown(evt) {
evt.preventDefault();
touchXY(evt);
}

//touch location
function touchXY(evt) {
evt.preventDefault();
if(lastPt!=null) {
var touchX = evt.touches[0].pageX - canvas.offsetLeft;
var touchY = evt.touches[0].pageY - canvas.offsetTop;
}
lastPt = {x:evt.touches[0].pageX, y:evt.touches[0].pageY};
}


