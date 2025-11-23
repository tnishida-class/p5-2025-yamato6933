// カレンダーを描画しよう
function setup(){
  createCanvas(200, 200);
  text("2025年10月カレンダー",10,10);
  drawCalendar(2025, 10);
}

function drawCalendar(y, m){
  for(let i = 0; i < 7; i++){
    const x = i * width / 7;
    const y = 20;
    stroke(255);
    text(dayOfWeekAsString(i), x, y);
  }

  let dow = dayOfWeek(y, m, 1);
  stroke(255);
  let y_new = 40;
  for(let d = 1; d <= daysInMonth(y, m); d++){
    // BLANK[3] まずは daysInYear, dayOfWeek を作ろう
    //一番最初
    let x_new = dayOfWeek(y,m,d) * width / 7;
    text( d, x_new, y_new );
    if (dayOfWeek(y,m,d) == 0){
      stroke(0)
    }

    if ( dayOfWeek(y,m,d) == 6){
      stroke(255,0,0);
      y_new += 20;
      stroke(255);
    }
  }
}

function isLeapYear(y){
  return (y % 4 == 0) && (y % 100 != 0) || (y % 400 == 0);
}

function daysInYear(y){
  // BLANK[1] hint: 閏年なら366日、そうでなければ365日
  if (isLeapYear){
    return 366;
  } else{
    return 365;
  }
}

function daysInMonth(y, m){
  if(m == 2){
    return isLeapYear(y) ? 29 : 28;
  }
  else if(m == 4 || m == 6 || m == 9 || m == 11){
    return 30;
  }
  else{
    return 31;
  }
}

function dayOfYear(y, m, d){
  let count = 0;
  for(let i = 1; i < m; i++){
    count += daysInMonth(y, i);
  }
  return count + d;
}

function dayOfWeek(y, m, d){
  // BLANK[2] hint: 曜日がわかる日からの経過日数を求め7の剰余を取る　たとえば1970年1月1日木曜日
  let days=0;
  for (i = 1970; i < y; i++){
    days += daysInYear(i);
  }
  days += dayOfYear(y,m,d);
  if (days % 7 == 0){
    return 4;
  }if (days % 7 == 1){
    return 5;
  }if (days % 7 == 2){
    return 6;
  }if (days % 7 == 3){
    return 0;
  }if (days % 7 == 4){
    return 1;
  }if (days % 7 == 5){
    return 2;
  }if (days % 7 == 6){
    return 3;
  }
}

function dayOfWeekAsString(dow){
  const a = ["日", "月", "火", "水", "木", "金", "土"];
  return a[dow];
}
