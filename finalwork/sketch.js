// 最終課題を制作しよう
let balls;
let targets;
let gameover = false;
let user_x = 0;
let user_y = 0;
let items = [];
let range_item = 30;
let score = 0;
let user_angle = 0;
let user_rotate_speed = 0.05;
let num_targets = 3;
let level = 1;
let req_score = 100;
let pre_req_score = 0;
let option = ["boost","long_range","speed","magnet"];
let selected_option;
let clear = false;
let selected_option_1 = "";
let selected_option_2 = "";
let fire_rate = 25;
let range = 200;
let user_speed = 5;


function setup(){
  createCanvas(windowWidth, windowHeight);
  balls = [];
  targets = [];
}
function draw(){
  background(160, 192, 255);

  //ゲームオーバーになった時の表示
  if (gameover) {
    background(0, 0, 0); 
    fill(255, 0, 0); 
    textSize(64);
    textAlign(CENTER, CENTER);
    text('GAME OVER', width / 2, height / 2);
    textSize(24);
    fill(255);
    text('リロードして再開', width / 2, height / 2 + 60);
    return; // draw関数の以降の処理を停止する
  }

  //レベルクリアした時の表示
  if (clear){
    background(160, 192, 255);
    fill(255); 
    textSize(64);
    textAlign(CENTER, CENTER);
    text("Level " + (level-1) + " CLEAR!!", width / 2, 100);

    textSize(32);
    text("select your option",width/2,150);

    //オプションをランダムに出力
    if(selected_option_1 == ""){
      selected_option_1 = random(option);
    }
    text(selected_option_1,width/2-150,height/2-20);
    textSize(16);
    text("click: A ",width/2-150,height/2+10);
    if (keyIsDown("A".charCodeAt(0))){
      selected_option = selected_option_1;
      selected_option_1 = "";
      selected_option_2 = "";
      clear = false;
    }
    if(selected_option_2 == ""){
      selected_option_2 = random(option);
    }
    textSize(32);
    text(selected_option_2,width/2+150,height/2-20);
    textSize(16);
    text("click: S",width/2+150,height/2+10);
    if (keyIsDown("S".charCodeAt(0))){
      selected_option = selected_option_2;
      selected_option_1 = "";
      selected_option_2 = "";
      clear = false;
    }


    if(keyIsDown(" ".charCodeAt(0))){
      clear = false;
      selected_option_1 = "";
      selected_option_2 = "";
    }
    textSize(32);
    text("continue:(space key)",width/2,height/2+200);

    return;
  }

  //オプションによる設定の変更
  if (selected_option == "boost"){
    fire_rate -= 5;
    selected_option = "";
  }
  if (selected_option == "long_range"){
    range *= 1.5;
    selected_option = "";
  } 
  if (selected_option == "speed"){
    user_speed += 1;
    selected_option = "";
  }
  if (selected_option == "magnet"){
    range_item *= 1.5;
    selected_option = "";
  }

  

  //ユーザー設定
  fill(160, 192, 255);
  ellipse(user_x,user_y,range*2);
  //ユーザーも回転させるようにする
  push();
  translate(user_x,user_y);
  rotate(user_angle);
  fill(255);
  rectMode(CENTER);
  rect(0, 0, 30,30);
  pop();


  //レベル・スコアの表示
  fill(255); 
  textSize(16);
  textAlign(CENTER, CENTER);
  text("score: " + score,40, 30);

  fill(255); 
  textSize(16);
  textAlign(CENTER, CENTER);
  text("level: " + level,40, 60);

  fill(255); 
  textSize(16);
  textAlign(CENTER, CENTER);
  text(req_score + "score is required for level up",200, 30);




  user_angle += user_rotate_speed;
  /*ellipse(user_x,user_y,30);*/
  if(keyIsDown(LEFT_ARROW)){ user_x -= user_speed; }
  if(keyIsDown(RIGHT_ARROW)){ user_x += user_speed; }
  if(keyIsDown(UP_ARROW)){ user_y -= user_speed; }
  if(keyIsDown(DOWN_ARROW)){ user_y += user_speed; }
  

  //targetの生成
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    //こだわりポイント：次どの位置に的が出てくるかを薄い円で表示
    if (t.wait > 0){
      fill(0, 0, 0, 50);
      noStroke();
      ellipse(t.x, t.y, t.size); 
      stroke(0); 
      t.wait -= 1;
    }else{
      fill(0);
      ellipse(t.x, t.y, t.size);
      t.x += t.vx;
      t.y += t.vy;

      if (t.x < 0 || t.x > width) t.vx *= -1;
      if (t.y < 0 || t.y > height) t.vy *= -1;
    }
  }

  //アイテムの描写
  for (let i = 0; i < items.length; i++){
    let item = items[i];
    //こだわりポイント：アイテムが移動しながら回転していてアクティブなゲームにする
    //AI：このコードの四角形を移動させながら回転させたいんだけど、javascriptには図形を回転させる関数とかある？
    push();  // 現在の座標系を保存
    translate(item.x + item.size/2, item.y + item.size/2);  // 四角形の中心に移動
    rotate(item.angle);  // 回転
    fill(item.color);
    rectMode(CENTER);  // 中心基準で描画
    rect(0, 0, item.size, item.size);
    pop();  // 座標系を元に戻す

    item.angle += item.rotateSpeed;
    item.x += item.vx;  
    item.y += item.vy;
  
    /*fill(item.color);
    rect(item.x,item.y,item.size,item.size);*/
  }
  //アイテムの回収
  const active_items = [];
  for (let i = 0; i < items.length; i++){
    let item = items[i];
    let dis = dist(user_x, user_y, item.x + item.size/2, item.y + item.size/2);
    if(dis < range_item){
      score += 5;
    } else{
      active_items.push(item);
    }
  }
  items = active_items;
  
  //的の方に飛んでいくようにしたい
  let target = findNearestTarget(user_x,user_y);

  //ボールの発射
  //円の中にはいっていたらボールを飛ばすようにしたい
  let min = findMinDistance(user_x,user_y);
  if(frameCount % fire_rate === 0 && target && min <= range){
    let dx = target.x - user_x;
    let dy = target.y - user_y;
    let distance = sqrt(dx*dx + dy*dy);

    let speed = 9;//正規化する
    let vx = (dx / distance) * speed;
    let vy = (dy / distance) * speed;

    const b = { x: user_x, y: user_y, size: 10, vx: vx, vy: vy};
    balls.push(b);
  } 


  // ボールのアニメーション
  for(let i = 0; i < balls.length; i++){
    let b = balls[i];
    fill(255);
    ellipse(b.x, b.y, b.size);
    b.x += b.vx;
    b.y += b.vy;

    // 画面外に出たボールを削除
    if (b.x < 0 || b.x > width || b.y < 0 || b.y > height) {
    balls.splice(i, 1);
    }
  }

  //ターゲット
  if(frameCount % 240 === 0) {
    let speed = 1;
    for (let i = 0; i < num_targets; i++){
      let angle = random(TWO_PI);
      let vx = cos(angle) * speed; //AI：sin,cos使ったら正規化できる
      let vy = sin(angle) * speed;
      let t = {
        x:random(0,width),
        y:random(0,height),
        vx:vx,
        vy:vy,
        size: 20,
        wait: 120
      };

      targets.push(t);
    }
  }
  //こだわりポイント：ターゲットの生成される数をレベルによって変える
  num_targets = fib(1,2,level+1);



  // ボールに当たった or 大きくなりすぎた的を配列から削除する
  const activeTargets = []; // 生き残った的を一時的に保持する配列
  for(let i = 0; i < targets.length; i++){
    let t = targets[i];
    if (t.wait > 0) {
      activeTargets.push(t); //AI：このコードはなんで動かないんですか？コードの指摘とそれに対応するコードの例を教えて
      continue; // 当たり判定はスキップ
    }
    if(t.size < 200){ // 大きくなりすぎていない
      let hit = false;
      for(let j = 0; j < balls.length; j++){ // すべてのボールと衝突判定
        let b = balls[j];
        let dis = dist(b.x,b.y,t.x,t.y);//AI
        let ball_radius = b.size/2;
        let target_radius = t.size/2;
        if (dis < ball_radius + target_radius){
          hit = true;
          balls.splice(j, 1);//AI: 衝突時にボールを消したい
        }
      }
      if(hit){
        generate_items(t.x,t.y,4);
      }else{
      activeTargets.push(t);
       } // 衝突していなければ生き残る
    }
  }
  targets = activeTargets; // 生き残った的だけを残す

  //的とユーザーがぶつかったらゲームオーバー
  if(judgement(user_x,user_y,30/2,targets)){
    gameover = true;
  }

  //レベルアップ
  if (score >= req_score){
    level += 1;
    pre_req_score = req_score;
    req_score = fib(50,50,level+2);
    clear = true;
  }


  //レベルバー
  fill(160, 192, 255);
  rect(100,40,width-200,10);
  fill(255,0,0);
  rect(100,40,(score-pre_req_score)/(req_score-pre_req_score)*(width-200),10);

}



//一番近くのボールの位置を見つける
function findNearestTarget(mx,my){
  if(targets.length == 0){
    return null;
  }
  let nearest = null;
  let mindistance = Infinity;
  //線形探索で距離の最小値を探す
  for (let i = 0; i < targets.length; i++){
    let t = targets[i];
    let distance = dist(mx,my,t.x,t.y);//distは二点間の距離を計算する関数
    if( distance < mindistance){
      mindistance = distance;
      nearest = t;
    }
  }
  return nearest;
}


//一番近いターゲットの距離を測る
function findMinDistance(mx,my){
  if(targets.length == 0){
    return null;
  }
  let mindistance = Infinity;
  //線形探索で距離の最小値を探す
  for (let i = 0; i < targets.length; i++){
    let t = targets[i];
    let distance = dist(mx,my,t.x,t.y);//distは二点間の距離を計算する関数
    if( distance < mindistance){
      mindistance = distance;
    }
  }
  return mindistance;
}

//ユーザーが的とぶつかってないかどうかを判断する関数
function judgement(user_x,user_y,userRadius,target){
  for (let i = 0 ; i < target.length ; i++){
    let t = target[i];
    if (t.wait > 0){continue};
    let dis = dist(user_x,user_y,t.x,t.y);

    let target_radius = t.size/2;
    // 距離が二つの円の半径の合計より小さければ衝突
    if (dis < userRadius + target_radius){
      return true;
    }
  }
  return false;
}

//スコアのためのアイテムを生成する関数
function generate_items(x,y,count){
  let angle = random(TWO_PI); 
  let speed = 1/2;
  for(let i = 0; i < count; i++){
    items.push({
      x: x + random(-20,20),
      y: y + random(-20,20),
      size: 5,
      color: 0,
      angle: 0,
      rotateSpeed: random(0.05, 0.15),
      vx: cos(angle) * speed, 
      vy: sin(angle) * speed 
    });
  }
}

//こだわりポイント：フィボナッチ数列でレベル・難易度の管理
function fib(x0,x1,n){
  let x = [];
  x[0] = x0;
  x[1] = x1;
  for (let i = 2; i <= n; i++){
    x[i] = x[i-1] + x[i-2];
  }
  return x[n];
}


function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
} 