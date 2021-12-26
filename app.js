let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let center = {x: 75, y: 75};
let starting = {x: 0, y: 0};
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
     let newX = center.x + oldCoord.x*Math.cos(angle) - oldCoord.y*Math.sin(angle);
     let newY = -(-center.y + oldCoord.x*Math.sin(angle) + oldCoord.y*Math.cos(angle));
     return {x: newX, y: newY};
}

function imgDataToPoints(imData) {
    const points = [];
    for(let i=3; i<imData.data.length; i+=4) {
        if (imData.data[i] !== 0) {
            const pixelIdx = (i - 3) / 4;
            const y = Math.floor(pixelIdx/canvas.width)+1;
            const point = {y: y, x: pixelIdx % canvas.width};
            points.push(point);
        }
    }
    return points;
}

function drawZigzag() {
    let imgData = ctx.getImageData(starting.x,starting.y,canvas.width, canvas.height);
    let d = new Drawing (imgDataToPoints(imgData), starting.x, starting.y);
    const iterations = 70;
    for (let s = 0; s < iterations; s++) {
        setTimeout(() => {
            let sign = s < iterations/2 ? 1 : -1;
            d = d.transform((x, y) => {
                return {x: x+1, y: y+2*sign}
            }, true);
            center.x += 1;
            center.y += 2*sign;
            starting.x += 1;
            starting.y += 2*sign;
            d = d.transform(rotate);
            const newCanvas = d.toCanvasPixels(canvas.width);
            for(let i = 0; i < imgData.data.length; i++) {
                imgData.data[i+(d.x+d.y*canvas.width)*4] = newCanvas[i];
            }
            ctx.putImageData(imgData, 0, 0);
            console.log("Attempt #" + s);
        }, (s+1) * 100);
    }
}

window.onload = ()=> {
    initialDrawSmile(center.x, center.y);
    drawZigzag();
}





