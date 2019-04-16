x=150;
y=150;
clock=document.getElementById("a-clock");
ctx=clock.getContext("2d");
firstload=true;
 
function loop() {

    time=new Date();
    h=time.getHours();
    m=time.getMinutes();
    s=time.getSeconds();
    
    ctx.beginPath();
    if (firstload) {
        ctx.arc(x,y,140,0,Math.PI*2,true);
        ctx.strokeStyle="gray";
        ctx.lineWidth=1;
    } else {
        ctx.arc(x,y,135,0,Math.PI*2,true);
    }
    ctx.fillStyle="#F3F3F3";
    ctx.fill();
    if (firstload) ctx.stroke();
    drawDots();
    
    drawPointer(360*(h/12)+(m/60)*30-90,65,"black",2);
    drawPointer(360*(m/60)+(s/60)*6-90,110,"black",2);
    drawPointer(360*(s/60)+x-90,100,"red",1);

    drawMiddle();

    if (firstload) firstload = false;
}
 
function drawDots() {
    for(n=0;n<12;n++) {
        d=-60;
        str = '·';
        dd = Math.PI/180*(d+n*30);
        tx = Math.cos(dd)*120+145;
        ty = Math.sin(dd)*120+157;
        ctx.font = "20px IBM Plex Sans";
        ctx.fillStyle = "dimgray";
        ctx.fillText(str, tx, ty);
    }
}

function drawMiddle() {
    ctx.beginPath();
    ctx.fillStyle="black";
    ctx.arc(x,y,3,0,Math.PI*2,true);
    ctx.fill();
    ctx.strokeStyle="#111111";
    ctx.lineWidth=1;
    ctx.stroke();
}
 
function drawPointer(deg,len,color,w) {
    rad=(Math.PI/180*deg);
    x1=x+Math.cos(rad)*len;
    y1=y+Math.sin(rad)*len;
    
    ctx.beginPath();
    ctx.strokeStyle=color;
    ctx.lineWidth=w;
    ctx.moveTo(x,y);
    ctx.lineTo(x1,y1);
    ctx.stroke();
}

setInterval(loop,500);