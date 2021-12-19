let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let center = {x: 75, y: 75};
function initialDrawSmile(xCenter, yCenter) {
  if (canvas.getContext) {
    ctx.beginPath();
    ctx.arc(xCenter, yCenter, 50, 0, Math.PI*2, true);
    ctx.moveTo(110, 75);
    ctx.arc(75, 75, 35, 0, Math.PI, false);
    ctx.moveTo(65, 65);
    ctx.arc(60, 65, 5, 0, Math.PI*2, true);
    ctx.moveTo(95, 65);
    ctx.arc(90, 65, 5, 0, Math.PI*2, true);
    ctx.stroke();
  }
}

function rotate(x, y) {
     let oldCoord = {x: x - center.x, y: center.y - y};
     const angle = Math.PI/36;
     let newX = center.x + Math.round(oldCoord.x*Math.cos(angle) - oldCoord.y*Math.sin(angle));
     let newY = -(-center.y + Math.round(oldCoord.x*Math.sin(angle) + oldCoord.y*Math.cos(angle)));
     return {x: newX, y: newY};
}

function imgDataToPoints(imData) {
    let points = [];
    for(let i=3; i<imData.data.length; i+=4) {
        if (imData.data[i] != 0) {
            let y = Math.floor(((i-3)/4)/this.w)+1;
            let o = {y: y, x: ((i-3)/4)%y };
            points.push(o);
        }
    }
    return points;
}

function drawZigzag() {
    let imgData = ctx.getImageData(0,0,canvas.width, canvas.height);
    let d = new Drawing (ctx, canvas.width, canvas.height, imgData, canvas, imgDataToPoints(imgData));
    for (let s = 0; s < 70; s++) {
        setTimeout(() => {
            let sign = s < 35 ? 1 : -1;
            d.transform((x, y) => {
                return {x: x+1, y: y+2*sign}
            });
            center.x += 1;
            center.y += 2*sign;

            d.transform(rotate);
            d.draw2();
            console.log("Attempt #" + s);
        }, (s+1) * 100);
    }
}

window.onload = ()=> {
    initialDrawSmile(center.x, center.y);
    drawZigzag();
}






