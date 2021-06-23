var gameState = 0
var bg1 
var player
var playerStanding, playerRunning1,playerRunning2,playerLayingDown
var invG1
var invG2
var accidentFlag = 0
var hospitalbg
var car,carImage
var doctor,doctorImg
var dialog1,dialog1Img, dialog2, dialog2Img, dialog3Img
var arrow, arrowImg
var dialogFlag = 0
var clickHere

function preload(){
  bg1 = loadImage("playerhouse.png")
  playerStanding = loadImage("PlayerStanding.png")
  roadBg = loadImage ("road background.png")
  carImage = loadImage ("car.png")
  playerLayingDown = loadImage("PlayerLayingDown.png")
  hospitalbg = loadImage("hospital bg.png")
  doctorImg = loadImage("doctor.png")
  dialogImg1 = loadImage("docText1.png")
  arrowImg  = loadImage("arrow.png")
  dialog2Img = loadImage("dialog2.png")
  dialog3Img = loadImage("dialog3.png")
}
function setup(){
  createCanvas(1500,800)
  player = createSprite(740,555,10,10)
  player.addImage(playerStanding)
  player.visible = false
  player.debug = true
  player.setCollider("rectangle",20,10,105,194)
  player.scale =0.8
  
  invG1 = createSprite(730,670,530,10)
  invG2 = createSprite(750,717,1500,10)

  car = createSprite(750,120,10,10)
  car.addImage(carImage)
  car.scale=2
  car.visible=false
  car.debug = true
  car.setCollider("rectangle",30,0,75,150)

  doctor = createSprite(600,475,10,10)
  doctor.scale = 0.8
  doctor.addImage(doctorImg)
  doctor.visible = false

  dialog1 = createSprite(750,315,10,10)
  dialog1.addImage(dialogImg1)
  dialog1.visible = false
  dialog1.scale = 0.4

  arrow = createSprite(1400,750,10,10)
  arrow.addImage(arrowImg)
  arrow.visible = false
  arrow.scale = 0.5
  
  dialog2 = createSprite(950,335,10,10)
  dialog2.addImage(dialog2Img)
  dialog2.visible = false
  dialog2.scale = 0.4

  clickHere = createSprite(700,344,20,10)
  clickHere.visible = false
}


function draw() {
  background("red")
  if (gameState === 0){
    background("black")
    textSize(20)
    fill("white")
    textFont("Times New Roman")
    text("Make Your Own Decisions  ",600,220)
    text("But Be Careful What You Choose.",575,250)
    text("Press 'Space' To Continue",600,400)
    if (keyDown("space")){
      gameState = 1
    }
  }
  if (gameState === 1){
    background(bg1)
    player.visible = true
    
    if (keyDown("w")){
      player.velocityY = -10
    }
    player.velocityY = player.velocityY+0.8
    player.collide(invG1)
    player.collide(invG2)

    if (keyDown("a")){
      player.x = player.x-5
      player.rotate = 180
    }
    if (keyDown("d")){
      player.x = player.x+5
    }
    if(player.x === 1425){
      gameState = 2
      player.x =142
      player.y = 475
    }

    
  }
  if(gameState === 2){
    background(roadBg)
    
    car.visible=true
    car.velocityY = 3
    player.velocityX=4
    if (player.isTouching(car)){
      accidentFlag = 1
    }
    if (accidentFlag === 1){
      player.velocityX = 0
      player.addImage(playerLayingDown)
    }
    if (accidentFlag === 1 && car.y > 750){
      gameState = 3
      player.mirrorX(player.mirrorX()*-1)

    }
    player.collide(invG1)
  }
  if (gameState === 3){
    arrow.visible = true
    dialog1.visible = true
    car.destroy()
    doctor.visible = true
    player.scale = 1.2
    background(hospitalbg)
    player.x = 1160
    player.y = 435
    if (mousePressedOver(arrow)){
      gameState = 4
    }
  }
  if(gameState === 4){
    background(hospitalbg)
    dialog2.visible = true
    dialog1.visible = false
   player.addImage(playerStanding)
   player.x = 1160
   player.y = 475
   player.scale = 1.5
   if (mousePressedOver(arrow)){
     dialogFlag = 1
   }
   if (dialogFlag === 1){
    dialog1.visible = true
    dialog2.visible = false
    dialog1.addImage(dialog3Img)
   }
   if (mousePressedOver(clickHere)){
     gameState = 5
     
   }
  }
  if (gameState === 5){
    background("black")
  }
  drawSprites()
  textSize(20)
  fill("red")
  text(mouseX + "," + mouseY,mouseX,mouseY)
}
