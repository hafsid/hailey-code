// variable for score and gameState
var score=0, gameState=0;
//variables for sprites
var button, restart, pause, sloth, tree;
var branch1, branch2, branchGro;
var fruit, fruitGro;
var decor, planet1Img, planet2Img, planet3Img, planeImg, satelliteImg, DecorGro;
//variables for images
var buttonImg, restartImg, pauseImg, slothAni, slothIdle, treeImg, branch1Img, branch2Img, appleImg, bananaImg, orangeImg;
//Variables for the background
var Bg, backgroundImg;

function preload() {
  //Loads buttons
  buttonImg = loadImage("Images/play button.png")
  restartImg = loadImage("Images/reset button.png")
  pauseImg = loadImage("Images/pause.png")

  //Loads sloth and tree

  slothAni = loadAnimation("Images/Sloth/sloth-1.png", "Images/Sloth/sloth-2.png", "Images/Sloth/sloth-3.png")
  slothIdle = loadImage("Images/Sloth/sloth-1.png")
  treeImg = loadImage("Images/treebark.jpg")

  //Loads branchs
  branch1Img = loadImage("Images/tree branch1.jpg")
  branch2Img = loadImage("Images/tree branch2.png")

  //loads fruits
  appleImg = loadImage("Images/apple.png")
  bananaImg = loadImage("Images/banana.png")
  orangeImg = loadImage("Images/orange.png")

  //loads backgrounds
  backgroundImg = loadImage("Images/collided_photo.png");

  //loads Decorations
  planet1Img = loadImage("Images/planet1.png");
  planet2Img = loadImage("Images/planet2.png");
  planet3Img = loadImage("Images/planet3.png");
  planeImg = loadImage("Images/airplane.png");
  satelliteImg = loadImage("Images/satellite.png");
}

function setup() {
  //Makes Canvas
  createCanvas(displayWidth,displayHeight);
  //Makes Branch Group
  branchGro = new Group();
  fruitGro = new Group();
  //Makes Background
  Bg = createSprite( displayWidth/2 -4,-displayHeight*4 ,displayWidth+10, -displayHeight*5);
  Bg.addImage("bg", backgroundImg);
  Bg.scale = 1.5;
  Bg.velocityY = 10;

  //Makes Tree
  tree = createSprite(displayWidth/2, displayHeight/2, displayWidth/1.8, displayHeight);
  tree.addImage(treeImg)
  tree.scale = 2;
  tree.velocityY= 0;
  //tree.visible = false
  //Makes Sloth
  sloth = createSprite(displayWidth/2, displayHeight/1.5, 100, 50);
  sloth.addAnimation("idle", slothIdle);
  sloth.addAnimation("climbing", slothAni);
  sloth.scale = 0.8;
  sloth.setCollider("rectangle",0,10,85,160);
  //Makes play button
  button = createSprite(displayWidth/2,displayHeight/3,50,50)
  button.addImage(buttonImg)
  button.scale = 0.2;
  button.visible = true;
  
  //Makes reset button
  restart = createSprite(displayWidth/2,displayHeight/3,50,50);
  restart.addImage(restartImg)
  restart.visible = false;

  //Makes pause button
  pause = createSprite(displayWidth*0.95,displayHeight/15,50,50);
  pause.addImage(pauseImg)
  pause.scale = 0.2;
  pause.visible = false;
}

function draw() {
  background(0);

  //sloth.debug = true;

  //Start
  if(gameState === 0) {
    sloth.changeAnimation("idle", slothIdle);
    pause.visible = false;

    button.visible = true;
    if(mousePressedOver(button) && gameState === 0) {
      gameState=1;
      button.visible = false;
    }
  }

  //Play
  if(gameState === 1) {
    tree.velocityY= 5;
    sloth.changeAnimation("climbing", slothAni);

    //Makes pause button visible
    pause.visible = true;

    //When pause is pressed pause game
    if(mousePressedOver(pause) && gameState === 1) {
      gameState = 4;
    }

    //Makes the tree reset to make it look like its moving
    if(tree.y > height){
      tree.y = height/2;
    }

    //Makes the sloth move with arrow key
    if(keyDown("right") && sloth.x < 1280){
      sloth.x += 7;
    }
      if(keyDown("left") && sloth.x > 252){
      sloth.x -= 7;
    }

    //
    if(score === 100) {
      
    }
    //Makes score increase when fruit is touched
    if(sloth.isTouching(fruitGro)) {
      score += 5;
      fruitGro.destroyEach();
    }

    //Ends game if sloth touches branches
    if(sloth.isTouching(branchGro)) {
      gameState=3;
    }

    Branches();
    Fruits();
    Decorations();
  }
  
  //End
  if(gameState === 3) {
    sloth.changeAnimation("idle", slothIdle);
    tree.velocityY = 0;
    branchGro.setVelocityYEach(0);
    fruitGro.setVelocityYEach(0);

    restart.visible = true;
    if(mousePressedOver(restart) && gameState===3) {
      restart.visible = false;
      branchGro.destroyEach();
      fruitGro.destroyEach();
      gameState=0;
      score = 0;
    }
  }

  //Pause
  if(gameState === 4) {
    sloth.changeAnimation("idle", slothIdle);
    tree.velocityY = 0;
    branchGro.setVelocityYEach(0);
    fruitGro.setVelocityYEach(0);

    //Makes game resume when pause is pressed again
    if(mousePressedOver(pause) && gameState === 4) {
      gameState = 1;
    }
  }

 drawSprites();

 fill('white')
  text(mouseX+","+mouseY,mouseX,mouseY);

  //Makes text for score
  textSize(30)
  text("Score: "+score, 50,50)
}

function Branches() {
  if(frameCount % 200 === 0) {
    
    var leftLocation = Math.round(random(252,717));

    var rightLocation = Math.round(random(750,1280));

    branch1 = createSprite(leftLocation,-30,20,20);
    branch1.addImage(branch1Img);
    branch1.scale = 0.13;
    branch1.velocityY = 4;
    branch1.lifeTime = 100;
    branchGro.add(branch1);

    branch2 = createSprite(rightLocation,-30,20,20);
    branch2.addImage(branch2Img);
    branch2.scale = 0.13;
    branch2.velocityY = 4;
    branch2.lifeTime = 100;
    branchGro.add(branch2);

    sloth.depth = branch1.depth;
    sloth.depth = branch2.depth;
    sloth.depth+= 1;

    //branch1.debug = true;
    //branch2.debug = true;
  }
} 

function Fruits() {
  if(frameCount % 230 === 0) {
    fruit = createSprite(Math.round(random(252,1280)),-30,20,20)
    fruit.velocityY = 4;
    //fruit.debug = true;

    var rand = Math.round(random(1,3))
    switch(rand) {
      case 1: fruit.addImage(appleImg);
      break;
      case 2: fruit.addImage(bananaImg);
      break;
      case 3: fruit.addImage(orangeImg);
      break;
    }

    fruitGro.add(fruit);
    fruit.depth = sloth.depth + 1;
    fruit.lifeTime = 100;
  }
}

function Decorations() {
  //Makes Decorations
  if(frameCount % 250 === 0){
    decor = createSprite(displayWidth/2, displayHeight/2, 50,50);
    decor.velocityX = Math.round(random(-4,4));
    decor.velocityY = Math.round(random(-4,4));

    //if(sloth.position === Bg.width/8)
    var img = Math.round(random(1,5));
    switch(img) {
      case 1: decor.addImage(planet1Img);
              decor.scale = 1;
      break;
      case 2: decor.addImage(planet2Img);
              decor.scale = 0.1;
      break;
      case 3: decor.addImage(planet3Img);
              decor.scale = 0.2;
      break;
      case 4: decor.addImage(planeImg);
              decor.scale = 0.05;
      break;
      case 5: decor.addImage(satelliteImg);
              decor.scale = 0.1;
      break;
    }
    decor.lifeTime = 100;
    decor.depth = tree.depth - 1;
  }
}