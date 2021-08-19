const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var fruit;
var fruit_con;
var bg_img,rabbit_img,melon_img;
var bunny,button;
var blink,eat,sad;

function preload(){
bg_img=loadImage("background.png")
rabbit_img=loadImage("Rabbit-01.png")
melon_img=loadImage("melon.png")
blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png")
 blink.playing=true;
 eat.playing=true;
 eat.looping=false;
 sad.playing=true;
 sad.looping=false;
}








function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  bunny=createSprite(200,620,100,100)
  //bunny.addImage(rabbit_img)
  bunny.scale=0.2
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("crying",sad)
  bunny.addAnimation("eating",eat)
  bunny.changeAnimation("blinking")
  ground = new Ground(200,690,600,20);
  rope= new Rope(7,{x:245,y:30})
  rectMode(CENTER);
  ellipseMode(RADIUS);
  
  textSize(50)
 blink.frameDelay=20;
 eat.frameDelay=20;
  button=createImg("cut_btn.png")
  button.position(220,30)
  button.size(50,50)
  button.mouseClicked(drop)
  var fruit_options={
    density:0.001
  }
  fruit=Bodies.circle(300,300,20,fruit_options)
  Matter.Composite.add(rope.body,fruit)

  fruit_con=new Link(rope,fruit);

}

function draw() 
{
  background(51);
  image(bg_img,0,0,displayWidth+80,displayHeight)
  ground.show();
  rope.show();
  if(fruit!=null){
    image(melon_img,fruit.position.x,fruit.position.y,40,40)
  }
  
  Engine.update(engine);
  
  imageMode(CENTER);
  if(collide(fruit,bunny)==true){
        bunny.changeAnimation("eating")
  }
  if(collide(fruit,ground.body)==true){
    bunny.changeAnimation("crying");
  }
   drawSprites()
}
function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con=null;
}
function collide(body,sprite){
  if(body!=null){
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d<=80){
      World.remove(world,fruit)
      fruit=null;
      return true
    }
    else{
      return false
    }
  }
}