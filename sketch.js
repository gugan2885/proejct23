const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;
var base;
var wall1,wall2;
var jointLink;
var stones=[];
var bg_img;
var stone_img;
var wood_img;
var button_img;
var breakButton;
var zombie;
var sadZombie;
var zombie1, zombie2, zombie3, zombie4;
function preload(){
  bg_img=loadImage("background.png");
  stone_img=loadImage("stone.png");
  wood_img=loadImage("wood.png");
  sadZombie=loadImage("zombie.png")
  zombie1=loadImage("zombie1.png");
  zombie2=loadImage("zombie2.png");
  zombie3=loadImage("zombie3.png");
  zombie4=loadImage("zombie4.png");
  //sadZombie.playing = true;
  }

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);
  base= new Base(0,height-20,width*2,20);
  wall1=new Base(300,height/2,400,100);
  wall2=new Base(width-300,height/2,600,100);

  zombie=createSprite(width/2,height-170);
  zombie.addAnimation("lefttoright",zombie1,zombie2,zombie1);
  zombie.addAnimation("righttoleft",zombie3,zombie4,zombie3);
  zombie.addImage("sad",sadZombie);
  zombie.scale=0.1;
  zombie.velocityX=10;

  breakButton=createImg("axe.png");
  breakButton.position(width-200,height/2-70);
  breakButton.class("breakbutton")
  breakButton.size(70,70);
  breakButton.mouseClicked(handleButtonPress)

  bridge=new Bridge(30,{x:200,y:600});
  jointPoint=new Base(width-600,height/2,100,20)
  Matter.Composite.add(bridge.body,jointPoint);
  jointLink= new Link(bridge,jointPoint);
  for(var i=0;i<=8;i++){
    var x=random(width/2-200,width/2+300);
    var y=random(-10,140);
    var stone= new Stone(x,y,100)
     stones.push(stone)
     
     
  }
 
  imageMode(CENTER);
  ellipseMode(RADIUS);
}

function draw() {
  background(51);
  image(bg_img,width/2,height/2,width,height);
  
  Engine.update(engine);
//base.display()
//wall1.display()
//wall2.display()
bridge.show();
//jointPoint.display();

if (zombie.position.x>=width){
   zombie.velocityX=-10
   zombie.changeAnimation("rigthtoleft")
}
if (zombie.position.x<=0){
  zombie.velocityX=10
  zombie.changeAnimation("rigthtoleft")
}

for (var stone of stones){
  stone.display();
  var pos = stone.body.position;
  var distance=dist(zombie.position.x,zombie.position.y,pos.x,pos.y)
  if (distance<=50){
    zombie.velocityX=0;
    Matter.Body.setVelocity(stone.body,{x:10,y:-10});
    zombie.changeImage("sad");
    collided=true;
  }
  }
  
drawSprites();
}

function handleButtonPress(){
  jointLink.detach();
  setTimeout(()=>{
    bridge.break();
  },1500)
}

