// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1; //重力

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height /2;
  vx = 0;
  vy = 0;
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  background(160, 192, 255);
  const size = height * 0.05; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // BLANK[1] キャラクターの左右移動
  if(keyIsDown(LEFT_ARROW)){x -= 5;}
  if(keyIsDown(RIGHT_ARROW)){x += 5;}
  if((keyIsDown("A".charCodeAt(0))) && keyIsDown(RIGHT_ARROW)){ x += 8;}
  if((keyIsDown("A".charCodeAt(0))) && keyIsDown(LEFT_ARROW)){ x += 8;}



  // BLANK[2] 重力とジャンプ
  let jamp_flag;
  jamp_flag = false; //スペースが押されたことによるフラグ
  const max_height = height/2;

  if(!jamp_flag){
    if(y <= groundY-size*0.5){
      vy += g;
    } else {
      vy = 0;
        if (keyIsDown((" ".charCodeAt(0)))){
          jamp_flag = true;
          vy -= 20; 
        } else if (y <= max_height){
          jamp_flag = false;
          }
      }
  }

  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  x += vx;
  y += vy;

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}