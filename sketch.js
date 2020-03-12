const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, angryFace1,angryFace2;
var bg_image,bg,platform;
var naughtyFace, slingshot;
var teacher=[] 
var teacher_img;

var gameState = "onSling";

var score = 0;

function preload() {
    bg_image=loadImage("sprites/angry friends project bg.png");
    teacher_img=loadImage("sprites/teacher_burned_burned.png")
    
}

function setup(){
    var canvas = createCanvas(1200,400);
   
    engine = Engine.create();
    world = engine.world;
    ground = new Ground(600,height,1200,20);
    platform = new Box(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    angryFace1 = new Friends(810, 350);
    log1 = new Log(810,260,300,20, PI*57);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    angryFace2 = new Friends(810, 220);

    log2=  new Log(810,180,300,20, PI*57);

    box5 = new Box(810,140,70,70);
    log3 = new Log(778,120,150,20, PI*38);
    log4 = new Log(845,120,150,20, PI*19);

    naughtyFace = new Me(200,50);

 
    slingshot = new SlingShot(naughtyFace.body,{x:200, y:50});
   
}

function draw(){
    if(random (1) < 0.005){
        teacher.push(new Teacher())
       }  
        background(bg_image);
    
        noStroke();
        textSize(35)
        fill("black")
        text("Score  " + score, width-300, 50)
  
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    angryFace1.display();
    angryFace1.score();
    log1.display();

    box3.display();
    box4.display();
    angryFace2.display();
    angryFace2.score();
    log2.display();

    box5.display();
    log3.display();
    log4.display();

    naughtyFace.display();
    platform.display();
    
    slingshot.display();   
    //console.log(naughtyFace.body.speed);
    
     
for( var t of teacher){
    t.move();
    t.show();
  }
  drawSprites();
}

function mouseDragged(){
    //if (gameState!=="launched"){
        Matter.Body.setPosition(naughtyFace.body, {x: mouseX , y: mouseY});
    //}
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && naughtyFace.body.speed<1){
       
        naughtyFace.trajectory=[];
         Matter.Body.setPosition(naughtyFace.body,{x:200,y:50});
       slingshot.attach(naughtyFace.body);
       
       
      
    }
}

