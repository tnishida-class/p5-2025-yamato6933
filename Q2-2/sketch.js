// チェッカー
function setup() {
  createCanvas(200, 200);
  const size = width / 8; // マスの一辺の長さ
  noStroke();
  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      let x=size*i;
      let y=size*j;
      if((i+j)%2 != 0){
        fill(190);
        rect(x,y,size,size);
      }
      if((j<3) && ((i+j)%2 != 0)){
        fill(255, 0, 0);
        ellipse(x+size*0.5,y+size*0.5,size*0.9,size*0.9);
      }
      if((j>4) && ((i+j)%2 != 0)){
        fill(0);
        ellipse(x+size*0.5,y+size*0.5,size*0.9,size*0.9);
      }
    }
  }
}