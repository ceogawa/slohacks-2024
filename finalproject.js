function setup() {
    frameRate(60);
    createCanvas(800, 500);
    gameState = 3;
    gameWidth = 5000
    cx = 250
    cy = -50
    cspeed = 5
    dcy = 0;
    seconds = 0;
    worldX = 0;
    worldY = 0;
    jumpCounter = 10;
    hitpoints = 3
    legs = 0
    LEGSPEED = 20

    textX = 47;
    textY = 400;
    
    CW = 20 //half of width
    CH = 60
    c = [//-10000, 450, 10000, 450, 10000, 500, -10000, 500,
        //400, 400, 451, 400, 451, 451, 400, 451,
        //500, 451, 600, 400, 800, 400, 900, 450
        ];


    //Terrain Generator
        //Roofs
    for(i = cx - 100; i < gameWidth; i += 400) {
        RWidth = 250 + random(-50, 50)
        RHeight = 50 + random(100)
        Slant = 50 + random(-25, 25)
        c.push(i);
        c.push(520);
        c.push(i + Slant);
        c.push(520 - RHeight);
        c.push(i +  RWidth);
        c.push(520 - RHeight);
        c.push(i +  RWidth + Slant);
        c.push(520);

        //Chimney
        if(random(2) > 1) {
            CHeight = 60 + random(-50, 50)
            displace = random(-50, 50)
            c.push(i + RWidth/2 + displace);
            c.push(520);
            c.push(i + RWidth/2 + displace);
            c.push(520 - RHeight - CHeight);
            c.push(i + RWidth/2 + displace + 50);
            c.push(520 - RHeight- CHeight);
            c.push(i + RWidth/2 + displace + 50);
            c.push(520);
        }
    }
    c.push(5600) 
    c.push(520)
    c.push(5545)
    c.push(425)
    c.push(5394) 
    c.push(425) 
    c.push(5339)
    c.push(520)


    p = [200, 300, 220, 300, 220, 320, 200, 320];
    
    powerup = 0;
    
    bulletX = 750
    bulletY = 450
    bulletFreq = 1/10;
    dbulletFreq = 0;
    bulletCounter = 60;
    difficulty = 0;
    b = []

    stars = []
    for(i=0; i<150; i++) {
       noStroke();
       stars.push(random(width))
       stars.push(random(height))
    }

    presents = []
    for(i = 0; i < 10; i++) {
        presents.push(color(random(255), random(255), random(255)))
    }
    
 
}

function character(x, y) {
push();

    translate(x, y);
    if(Math.abs(worldDX) == cspeed) {
        legs += 1;
        if(legs == LEGSPEED) {
            legs = 0;
        }
    }
    console.log(legs)
    if(legs < LEGSPEED/3) {
        santaClaus(7, 35, 0, .3, 0)
    }
    else if(legs < 2 * LEGSPEED/3) {
        santaClaus(7, 35, 0, .3, 1)
    }
    else {
        santaClaus(7, 35, 0, .3, 2)
    }
    
    fill(255, 0, 0, 50)
    //quad(-CW, 0, CW, 0, CW, CH, -CW, CH);

pop();
}

function kid(x, y, sc)
{
   push();
      translate(x, y);
      scale(sc);

      noStroke();
      //hair
      fill('#996433');
      arc(0, 45, 110, 200, radians(180), radians(0));

      //neck
      fill('#D9B48B');
      rect(-10, 0, 20, 60);

      //body
      fill('#659933');
      arc(0, 90, 90, 70, radians(180), radians(0));
      fill(255);
      ellipse(-23, 55, 20);
      ellipse(-5, 60, 20);
      ellipse(5, 60, 20);
      ellipse(23, 55, 20);

      //head
      fill('#FACF9F');
      ellipse(0, 0, 80, 70);
      beginShape();
         curveVertex(-35, 18);
         curveVertex(32, 18);
         curveVertex(0, 38);
      endShape(CLOSE);

      //hair--bangs
      fill('#996433');
      push();
         translate(10, -25);
         rotate(radians(30));
         ellipse(0, 0, 70, 25);
      pop();
      push();
         translate(-15, -30);
         rotate(radians(-30));
         ellipse(0, 0, 50, 20);
      pop();

      //eyes
      fill(0);
      ellipse(-20, 0, 8);
      ellipse(20, 0, 8);

      //mouth
    //   noFill();
    //   strokeWeight(2);
    //   stroke('#e63250');
    //   beginShape();
    //      curveVertex(-15, 10);
    //      curveVertex(15, 10);
    //      curveVertex(0, 15);
    //   endShape(CLOSE);

      if(gameState == 2) {
    //   mouth ver 2 (shocked)
      noFill();
      strokeWeight(2);
      stroke('#e63250');
      ellipse(0, 15, 20);
      }
      else {
      //mouth ver 3 (sad)
      noFill();
      strokeWeight(2);
      stroke('#e63250');
      beginShape();
         curveVertex(-15, 15);
         curveVertex(15, 15);
         curveVertex(0, 10);
      endShape(CLOSE);
      //sad eyebrows
      stroke(0);
      strokeWeight(3);
      line(-30, -5, -10, -15);
      line(10, -15, 30, -5);
      //tear
      fill('#60baeb');
      noStroke();
      beginShape();
         curveVertex(30, 5);
         curveVertex(25, 15);
         curveVertex(30, 20);
         curveVertex(35, 15);
      endShape(CLOSE);
      }
   pop();
}

function grinch(x, y, sc)
{
   push();
      translate(x, y);
      scale(sc);

      noStroke();
      //neck
      fill('#6EA30A');
      rect(-10, 0, 20, 60);

      //head
      fill('#88cc0c');
      ellipse(0, 0, 60, 80);
      push();
         rotate(radians(-30));
         ellipse(10, 25, 50, 40);
      pop();
      push();
         rotate(radians(30));
         ellipse(-10, 25, 50, 40);
      pop();

        //eyes
        fill('#d8cd2d');
        ellipse(-15, -15, 25, 15);
        ellipse(15, -15, 25, 15);


      if(gameState == 2)
      {
        ellipse(-15, -15, 25, 15);
        ellipse(15, -15, 25, 15);
        fill('#A60026');
        ellipse(-15, -15, 5, 10);
        ellipse(15, -15, 5, 10);
        //sad eyebrows
        stroke(0);
        strokeWeight(3);
        line(-25, -20, -5, -30);
        line(5, -30, 25, -20);
        //frown
        noFill();
        strokeWeight(2);
        stroke(0);
        beginShape();
            curveVertex(-30, 30);
            curveVertex(30, 30);
            curveVertex(0, 10);
        endShape(CLOSE);
        //tear
        fill('#60baeb');
        noStroke();
        beginShape();
            curveVertex(20, -5);
            curveVertex(15, 5);
            curveVertex(20, 10);
            curveVertex(25, 5);
        endShape(CLOSE);
      }
      else {

      fill('#A60026');
      ellipse(-20, -17, 5, 10);
      ellipse(10, -17, 5, 10);

      //eyebrows
      stroke(0);
      strokeWeight(3);
      line(-25, -30, -5, -20);
      line(5, -20, 25, -30);

      //smile
      noFill();
      strokeWeight(2);
      stroke(0);
      beginShape();
         curveVertex(-30, 0);
         curveVertex(30, 0);
         curveVertex(0, 30);
      endShape(CLOSE);
      }

      //nose
      fill('#88cc0c');
      stroke(0);
      strokeWeight(1);
      ellipse(0, 0, 20, 10);

      //hat
      noStroke();
      fill('#D10026');
      arc(10, -45, 60, 50, radians(170), radians(-10));
      beginShape();
         curveVertex(10, -70);
         curveVertex(10, -45);
         curveVertex(70, -60);
      endShape(CLOSE);

      fill(240);
      beginShape();
         curveVertex(25, -35);
         curveVertex(30, -45);
         curveVertex(-20, -55);
         curveVertex(-20, -40);
      endShape(CLOSE);
      ellipse(65, -60, 20);

      //outfit
      fill('#ff0030');
      arc(0, 90, 90, 70, radians(180), radians(0));
      fill(255);
      ellipse(-23, 55, 25);
      ellipse(-5, 60, 25);
      ellipse(5, 60, 25);
      ellipse(23, 55, 25);

      //arms + hands
      stroke('#6EA30A');
      strokeWeight(10);
      line(-45, 88, -10, 60);
      line(45, 88, 10, 60);

      noStroke();
      fill('#88cc0c');
      ellipse(-5, 55, 15, 25);
      fill('#78B30B');
      ellipse(5, 50, 15, 25);

   pop();
}

function drawLights(cx, cy, t)
{
fill("#F2CB05");
for(var i=0;i<12;i++)
{
   x = cx + 6*cos(t);
   y = cy + 6*sin(t);
   ellipse(x, y, 3);
   t -= 2*PI/12;
}
}

//draws ornaments
function drawOrnaments(cx, cy, t)
{
fill("#BF2633");
for(var i=0;i<10;i++)
{
   x = cx + 8*cos(t);
   y = cy + 8*sin(t);
   ellipse(x, y, 5);
   t -= 2*PI/10;
}
}

//draws presents - random color
function drawPresents(boxX, boxY, bowX1, bowY1, bowX2, bowY2, pScale, col)
{

//box
push();
   translate(boxX, boxY);
   scale(pScale);
   noStroke();
   fill(presents[col + 1]);
   rect(-15, -15, 30, 30);
   fill(presents[col]);
   rect(-3, -15, 6, 30);
   rect(-15, -3, 30, 6);
pop();

//bow
push();
   translate(bowX1, bowY1);
   rotate(radians(135));
   scale(pScale);
   noFill();
   strokeWeight(3);
   stroke(presents[col]);
   ellipse(0, 0, 5, 10);
pop();

push();
   translate(bowX2, bowY2);
   rotate(radians(45));
   scale(pScale);
   noFill();
   strokeWeight(3);
   stroke(presents[col]);
   ellipse(0, 0, 5, 10);
pop();

}

function santaClaus(x, y, rot, sc, legs=0)
{
   push();
      translate(x, y)
      rotate(rot);
      scale(sc);

      noStroke();
    if(legs == 0) {
      //legs ver 1
      fill('#D10026');
      beginShape();
         curveVertex(-50, 40);
         curveVertex(-52, 50);
         curveVertex(-20, 70);
         curveVertex(0, 40);
         curveVertex(-20, 20);
         curveVertex(-40, 40);
      endShape(CLOSE);
      fill('#ff0030');
      beginShape();
         curveVertex(-20, 40);
         curveVertex(0, 55);
         curveVertex(18, 85);
         curveVertex(30, 85);
         curveVertex(30, 40);
      endShape(CLOSE);
      // feet
      fill('#5c3700');
      ellipse(-55, 50, 15, 25);
      ellipse(30, 85, 25, 15);
    }
    else if (legs == 1) {
    //   legs ver 2
      fill('#D10026');
      beginShape();
         curveVertex(-40, 50);
         curveVertex(-42, 60);
         curveVertex(-10, 70);
         curveVertex(10, 40);
         curveVertex(-10, 20);
         curveVertex(-30, 40);
      endShape(CLOSE);
      fill('#ff0030');
      beginShape();
         curveVertex(-10, 40);
         curveVertex(-10, 55);
         curveVertex(-8, 85);
         curveVertex(10, 85);
         curveVertex(20, 40);
      endShape(CLOSE);
    //   feet ver 2
      fill('#5c3700');
      ellipse(-45, 60, 15, 25);
      ellipse(5, 85, 25, 15);
    }
    else if (legs == 2) {
      //legs ver 3
      fill('#ff0030');
      beginShape();
         curveVertex(-50, 40);
         curveVertex(-52, 50);
         curveVertex(-20, 70);
         curveVertex(0, 40);
         curveVertex(-20, 20);
         curveVertex(-40, 40);
      endShape(CLOSE);
      fill('#D10026');
      beginShape();
         curveVertex(-20, 40);
         curveVertex(0, 55);
         curveVertex(18, 85);
         curveVertex(30, 85);
         curveVertex(30, 40);
      endShape(CLOSE);
      // feet
      fill('#5c3700');
      ellipse(-55, 50, 15, 25);
      ellipse(30, 85, 25, 15);
    }
      //body
      fill('#ff0030');
      ellipse(0, 0, 75, 95);

      //belt + buttons
      fill('#5c3700');
      beginShape();
         curveVertex(-35, 15);
         curveVertex(-35, 20);
         curveVertex(26, 25);
         curveVertex(26, 15);
      endShape(CLOSE);
      ellipse(20, -10, 5);
      ellipse(21, 0, 5);
      ellipse(20, 10, 5);

      //face
      fill('#fabe82');
      beginShape();
         curveVertex(0, -95);
         curveVertex(0, -90);
         curveVertex(-3, -85);
         curveVertex(0, -80);
         curveVertex(35, -80);
         curveVertex(30, -90);
         curveVertex(25, -100);
      endShape(CLOSE);

      //eye
      noFill();
      strokeWeight(2);
      stroke(0);
      beginShape();
         curveVertex(18, -88);
         curveVertex(28, -88);
         curveVertex(23, -90);
      endShape(CLOSE);

      noStroke();

      //bag
      fill('#A60026');
      ellipse(-50, -30, 90, 80);

      //beard
      fill(255);
      ellipse(0, -50, 30);
      ellipse(-10, -60, 30);
      ellipse(-15, -80, 40);
      ellipse(10, -53, 30);
      ellipse(-5, -70, 30);
      ellipse(15, -70, 25);
      ellipse(25, -70, 30);
      ellipse(25, -50, 40);

      //hat
      fill('#D10026');
      arc(5, -110, 55, 40, radians(170), radians(-10));
      beginShape();
         curveVertex(0, -130);
         curveVertex(-5, -105);
         curveVertex(-60, -120);
      endShape(CLOSE);

      fill(240);
      beginShape();
         curveVertex(-10, -95);
         curveVertex(-15, -105);
         curveVertex(30, -115);
         curveVertex(30, -100);
      endShape(CLOSE);
      ellipse(-60, -120, 20);

      //arms
      push();
         rotate(65);
         fill('#D10026');
         ellipse(5, 20, 50, 25);
      pop();

      //hands
      fill('#5c3700');
      ellipse(0, -30, 20);
      ellipse(30, -25, 15);

   pop();
}

function heart(x, y, sc)
{
   push();
      translate(x, y);
      scale(sc);

      noStroke();
      fill('#ff0030');
      arc(-5, 0, 10, 15, radians(180), radians(0));
      arc(5, 0, 10, 15, radians(180), radians(0));
      triangle(-10, 0, 0, 10, 10, 0);

   pop();
}

function lineCheck(x1, y1, x2, y2, x, y) {
    return (y1 - y2) * x + (x2 - x1) * y + x1 * y2 - x2 * y1 
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2-x1)**2 + (y2-y1)**2)
}

function draw() {

if(gameState == 0) {
    background("#011C40");

    for(i = 0; i < 300; i+= 2) {
        noStroke();
        fill(255, 255, 255, 50);
        ellipse(stars[i], stars[i+1], 5)
        fill(255);
        ellipse(stars[i], stars[i+1], 2);
     }

    fill(0);
    noStroke()

    fill(0);

    worldDX = 0;
    worldDY = 0;

    //GRAVITY
    dcy += .5;

    //Player Input
    if(keyIsDown(LEFT_ARROW)) {
        worldDX = cspeed;
    }
    if(keyIsDown(RIGHT_ARROW)) {
        worldDX = -cspeed;
    }
    if(keyIsDown(UP_ARROW) && jumpCounter == 0) {
        dcy -= 12;
        jumpCounter = 2;
    }
    if(dcy == 0.5 && jumpCounter != 0) {
        jumpCounter -= 1;
    }

    //C: Vertical Collision for Blocking Objects 
    for(var i = 0; i < c.length; i+= 8) {
        if((lineCheck(c[i], c[i+1], c[i+2], c[i+3], cx - CW, cy + CH + dcy) > 0 && 
              lineCheck(c[i+2], c[i+3], c[i+4], c[i+5], cx - CW, cy + CH + dcy) > 0 &&
              lineCheck(c[i+4], c[i+5], c[i+6], c[i+7], cx - CW, cy + CH + dcy) > 0 && 
              lineCheck(c[i+6], c[i+7], c[i], c[i+1], cx - CW, cy + CH + dcy) > 0) ||
              (lineCheck(c[i], c[i+1], c[i+2], c[i+3], cx + CW, cy + CH + dcy) > 0 && 
              lineCheck(c[i+2], c[i+3], c[i+4], c[i+5], cx + CW, cy + CH + dcy) > 0 && 
              lineCheck(c[i+4], c[i+5], c[i+6], c[i+7], cx + CW, cy + CH + dcy) > 0 &&
              lineCheck(c[i+6], c[i+7], c[i], c[i+1], cx + CW, cy + CH + dcy) > 0)) {
                dcy = 0;
         }
    }
    //C: Horizontal Collision for Blocking Objects
    for(var i = 0; i < c.length; i+= 8) {
        check = 0
        while((lineCheck(c[i] + worldDX, c[i+1], c[i+2] + worldDX, c[i+3], cx - CW, cy + CH + dcy) > 0 && 
              lineCheck(c[i+2] + worldDX, c[i+3], c[i+4] + worldDX, c[i+5], cx - CW, cy + CH + dcy) > 0 &&
              lineCheck(c[i+4] + worldDX, c[i+5], c[i+6] + worldDX, c[i+7], cx - CW, cy + CH + dcy) > 0 && 
              lineCheck(c[i+6] + worldDX, c[i+7], c[i] + worldDX, c[i+1], cx - CW, cy + CH + dcy) > 0) ||
              (lineCheck(c[i] + worldDX, c[i+1], c[i+2] + worldDX, c[i+3], cx + CW, cy + CH + dcy) > 0 && 
              lineCheck(c[i+2] + worldDX, c[i+3], c[i+4] + worldDX, c[i+5], cx + CW, cy + CH + dcy) > 0 &&
              lineCheck(c[i+4] + worldDX, c[i+5], c[i+6] + worldDX, c[i+7], cx + CW, cy + CH + dcy) > 0 && 
              lineCheck(c[i+6] + worldDX, c[i+7], c[i] + worldDX, c[i+1], cx + CW, cy + CH + dcy) > 0)) {
            if (check == 0) {
                dcy -= 2;
            }
            else if (check == 1) {
                worldDX += cspeed;
                dcy += 2;
            }
            else if (check == 2) {
                worldDX -= cspeed * 2;
            }
            check += 1
         }
    }

    //Check fall
    if(cy > 500) {
        hitpoints -= 1
        cy = -50
        worldDX -= 100
    }

    //Update collision objects
    for(var i = 0; i < c.length - 8; i+= 8) {
        c[i] = c[i] + worldDX
        c[i+2] = c[i+2] + worldDX
        c[i+4] = c[i+4] + worldDX
        c[i+6] = c[i+6] + worldDX
        quad(c[i], c[i+1], c[i+2], c[i+3], c[i+4], c[i+5], c[i+6], c[i+7]) 
    }
    var i = c.length - 8
    c[i] = c[i] + worldDX
    c[i+2] = c[i+2] + worldDX
    c[i+4] = c[i+4] + worldDX
    c[i+6] = c[i+6] + worldDX
    fill('#EDC200')
    quad(c[i], c[i+1], c[i+2], c[i+3], c[i+4], c[i+5], c[i+6], c[i+7]) 

    //P: Powerups
    // destroyP = -1;
    // for(var i = 0; i < p.length; i+= 8) {
    //     fill(0, 255, 0);
    //     quad(p[i], p[i+1], p[i+2], p[i+3], p[i+4], p[i+5], p[i+6], p[i+7]) 
    //     if(lineCheck(p[i] + worldDX, p[i+1], p[i+2] + worldDX, p[i+3], cx, cy + dcy) > 0 && 
    //        lineCheck(p[i+2] + worldDX, p[i+3], p[i+4] + worldDX, p[i+5], cx, cy + dcy) > 0 && 
    //        lineCheck(p[i+4] + worldDX, p[i+5], p[i+6] + worldDX, p[i+7], cx, cy + dcy) > 0 &&
    //        lineCheck(p[i+6] + worldDX, p[i+7], p[i] + worldDX, p[i+1], cx, cy + dcy) > 0){
    //         destroyP = i;
    //         powerup = 180;
    //      }
    // }
    // if(destroyP != -1) {
    //     p.splice(destroyP, 8);
    // }

    // for(var i = 0; i < c.length; i+= 8) {
    //     p[i] += worldDX
    //     p[i+2] += worldDX
    //     p[i+4] += worldDX
    //     p[i+6] += worldDX
    // }



    //Commit changes to memory
    worldX = worldX + worldDX
    cy = cy + dcy

//BULLETS:
    difficulty += (-worldDX/gameWidth)
    //Bullet Generation
    if(bulletCounter < 0)
    {
        b.push(bulletX); //X
        b.push(bulletY); //Y
        b.push(2 + ( 2 * difficulty)) //Speed
        v1 = createVector(cx - bulletX + random(-10, 10), cy - bulletY)
        b.push(v1.normalize()) //Direction

        bulletCounter = 300 - 290 * difficulty

        if(seconds > 100) {
            for(var i = 0; i < 4; i++){
                b.shift() //Prevent memory leak
            }
        }
    }
    else {
        bulletCounter -= 1;
    }

    //Bullet Movement
    fill(255);

    for(var i = 0; i < b.length; i += 4) {
        b[i] += (b[i+2] * b[i+3].x) + worldDX
        b[i+1] += (b[i+2] * b[i+3].y) + worldDY
        ellipse(b[i], b[i+1], 20)

        if(distance(b[i], b[i+1], cx, cy + 30) < 30) {
            hitpoints -= 1
            b[i+1] = -10000
        }
    }
    

    //Draw Hearts
    for(i = 0; i < hitpoints; i++) {
        heart(20 + 30 * i, 20, 1)
    }
    //Draw Grinch
    grinch(750, 435, .75)
    //Draw Santa
    character(cx, cy)

    if(-worldX > 5100) {
        gameState = 2;
    }
        //Update Gamestate
    if(hitpoints <= 0) {
        gameState = 1 //LOSE
    }
        
}

//End Screen
if(gameState == 1 || gameState == 2) {
    background("#D97979");

    var bowcol;
    var s = PI/2;
 
    //floor
    strokeWeight(1);
    stroke("#733B27");
    fill("#8C593B");
    rect(0, 300, width, 200);
 
   
    for (var y=150; y<295; y+=15)
    {
       for (var x=620; x<width; x+=30)
       {
          strokeWeight(1);
          stroke("#26130B");
          fill(85, 45, 35);
          rect(x, y, 30, 15);
          if(x>280 && x<width && y>210 && y<height)
          {
             noStroke();
             fill(0);
             rect(680, 210, 20, 90);
          }   
       }
    }
    strokeWeight(1.5);
    stroke(255);
    noFill();
    ellipse(650, 167, 6, 9);
 
    //candles on fireplace mantel
    noStroke();
    fill("#F2B263");
    rect(634, 114, 20, 36);
    rect(670, 128, 15, 22);
    fill("#F2D272");
    ellipse(644, 109, 5, 12);
    ellipse(678, 124, 4, 10);

      //for winning scenario
    if(gameState == 2) {
        //candy
        strokeWeight(1);
        stroke(0);
        fill("#218C03");
        ellipse(636, 171, 17); //green
        fill("#4478A6");
        rect(634, 167, 10, 15); //blue
        fill("#BF638E");
        ellipse(631, 177, 10); //pink
    }
    else {
        //    for losing scenario
        //coal
        noStroke();
        fill(0);
        ellipse(637, 181, 15);
        ellipse(644, 174, 10);
        ellipse(639, 175, 10);
    }

   //stocking
   push();
   translate(655, 179);
   rotate(radians(145));
   noStroke();
   fill(255);
   rect(0, 0, 23, 10);
pop();

noStroke();
fill(158,43,28);
beginShape();
   curveVertex(653, 182);
   curveVertex(653, 182);
   curveVertex(656, 187);
   curveVertex(660, 196);
   curveVertex(661, 200);
   curveVertex(658, 208);
   curveVertex(647, 214);
   curveVertex(642, 208);
   curveVertex(644, 203);
   curveVertex(648, 199);
   curveVertex(642, 193);
   curveVertex(640, 190);
   curveVertex(652, 182);
endShape();

//'nick' text on stocking
push();
   translate(635, 190);
   strokeWeight(1);
   stroke(0);
   rotate(radians(325));
   fill(0);
   textSize(12);
   textFont("Georgia");
   text("nick", 0, 0);
pop();

//rug
strokeWeight(1);
stroke("#733B27");
fill("#A6432D");
ellipse(502, 349, 250, 50);

//tree
noStroke();
fill("#1B4001");
triangle(502, 65, 445, 130, 559, 130);
triangle(502, 108, 410, 220, 594, 220);
triangle(502, 185, 380, 320, 624, 320);
fill("#401201");
rect(487, 320, 30, 30);

//lights on tree
drawLights(515, 93, s);
drawLights(504, 107, s);
drawLights(487, 114, s);
drawLights(470, 118, s);
drawLights(528, 158, s);
drawLights(516, 172, s);
drawLights(501, 184, s);
drawLights(483, 194, s);
drawLights(463, 200, s);
drawLights(442, 201, s);
drawLights(550, 255, s);
drawLights(535, 267, s);
drawLights(518, 277, s);
drawLights(499, 285, s);
drawLights(478, 291, s);
drawLights(457, 296, s);
drawLights(435, 300, s);
drawLights(413, 301, s);

//ornaments on tree
drawOrnaments(493, 90, s);
drawOrnaments(524, 114, s);
drawOrnaments(502, 141, s);
drawOrnaments(472, 167, s);
drawOrnaments(537, 191, s);
drawOrnaments(493, 215, s);
drawOrnaments(518, 241, s);
drawOrnaments(470, 250, s);
drawOrnaments(445, 276, s);
drawOrnaments(508, 305, s);
drawOrnaments(545, 283, s);
drawOrnaments(580, 300, s);

//star
fill("#F2B90C");
beginShape();
   vertex(502, 65);
   vertex(487, 73);
   vertex(495, 58);
   vertex(482, 51);
   vertex(496, 50);
   vertex(502, 31);

   vertex(508, 50);
   vertex(522, 51);
   vertex(509, 58);
   vertex(517, 73);
   vertex(502, 65);
endShape();

//window
strokeWeight(5);
stroke(255);

fill(0);
rect(70, 40, 300, 200);

grinch(270, 150, 1);

fill(145, 196, 217, 100);
fill(0, 100, 255, 100);
rect(70, 40, 300, 200);
line(70, 140, 370, 140); //horizontal line
line(220, 40, 220, 240); //vertical line

//presents
if(gameState==2)
{
    drawPresents(500, 330, 493, 295, 508, 295, 1.8, 0);
    drawPresents(430, 336, 427, 321, 434, 321, .8, 1);
    drawPresents(415, 345, 410, 326, 420, 326, 1, 2);
    drawPresents(460, 345, 454, 318, 468, 318, 1.4, 3);
    drawPresents(580, 331, 572, 298, 587, 298, 1.7, 4);
    drawPresents(544, 347, 540, 328, 547, 328, 1, 5);
}

kid(150, 370, 1.5);
}

//Start Screen
if(gameState == 3) {
    background(0);
    push();
    translate(textX, textY);
    scale(1.1)
    fill('255');
    textSize(18);
    textFont("Times New Roman");
    
    text("(Enter to skip)", 250, -200)
    text("Once upon a time... like any other year, Santa was delivering presents for Christmas Day.", 0, 0);
    text("However, the Grinch finally decided it was time to take down Santa this year.", 35, 20);
    text("He had enough of this 'holly jolly' business that Santa was always on about.", 40, 40);
    text("And so, the Grinch brought out his Snow Blaster 3000 and aimed it up high,", 40, 60);
    text("targeting the signature bright red sleigh.", 160, 80);

    text("Unfortunately for the Grinch, he was a terrible shot.", 120, 160);
    text("Instead, the Grinch simply poked a hole through Santa's bag of presents.", 50, 180);
    text("Santa, with his quick eye, noticed immediately, sending him running on the rooftops,", 20, 200);
    text("scouring for the kids' fallen presents.", 190, 220);

    text("However, the Grinch was not going to let Santa save the day with Christmas joy yet again.", 0, 300);
    pop();

    textY-=0.3;
    
    if(seconds > 30 || keyIsDown(ENTER)) {
        gameState = 0;
    }
}
    fps = frameRate()
    if (fps != 0) {
        seconds = seconds + (1/fps)
    }
    //console.log(seconds, fps, keyCode)
   // console.log(-worldX)
}