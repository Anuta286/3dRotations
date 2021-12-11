let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let center = {x: 75, y: 75};
function drawSmile(xCenter, yCenter) {
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
function newDrawFirst() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let newImgData = ctx.createImageData(canvas.width, canvas.height);
    let dNew = new Drawing(ctx, canvas.width, canvas.height, newImgData );
    let dOld = new Drawing(ctx, canvas.width, canvas.height, imgData );
    for (let x=0; x<canvas.width; x++) {
        for (let y=0; y<canvas.height; y++) {
            dNew.setAlpha(x+1, y+2, dOld.getAlpha(x, y));
        }
    }
    center.x+=1;
    center.y+=2;
    dNew.draw();
}
function newDrawSecond() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let newImgData = ctx.createImageData(canvas.width, canvas.height);
    let dNew = new Drawing(ctx, canvas.width, canvas.height, newImgData );
    let dOld = new Drawing(ctx, canvas.width, canvas.height, imgData );
    for (let x=0; x<canvas.width; x++) {
        for (let y=0; y<canvas.height; y++) {
            dNew.setAlpha(x+1, y-2, dOld.getAlpha(x, y));
        }
    }
    center.x+=1;
    center.y-=2;
    dNew.draw();
}

function drawMoveUp(x, y) {
    return {x: x+1, y: y+2};
}
function drawMoveDown(x, y) {
    return {x: x+1, y: y-2};
}
function rotate(x, y) {
     let oldCoord = {x: x - center.x, y: center.y - y};
     const angle = Math.PI/36;
     let newX = Math.round(oldCoord.x*Math.cos(angle) - oldCoord.y*Math.sin(angle)) + center.x;
     let newY = center.y + Math.round(oldCoord.x*Math.sin(angle) + oldCoord.y*Math.cos(angle));
     return {x: newX, y: newY};
}


function newDrawRotation() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let newImgData = ctx.createImageData(canvas.width, canvas.height);
    let dNew = new Drawing(ctx, canvas.width, canvas.height, newImgData, canvas);
    let dOld = new Drawing(ctx, canvas.width, canvas.height, imgData, canvas);
    for (let x=0; x<canvas.width; x++) {
        for (let y=0; y<canvas.height; y++) {
            let oldCoord = {x: x - center.x, y: center.y - y};
            const angle = Math.PI/18;
            let alpha = dOld.getAlpha(x, y);
            let newX = Math.round(oldCoord.x*Math.cos(angle) - oldCoord.y*Math.sin(angle)) + center.x;
            let newY = center.y + Math.round(oldCoord.x*Math.sin(angle) + oldCoord.y*Math.cos(angle));
            dNew.setAlpha(newX, newY, alpha);
        }
    }
    dNew.draw();
}

function drawZigzag() {
    let imgData = ctx.createImageData(canvas.width, canvas.height);
    let d = new Drawing (ctx, canvas.width, canvas.height, imgData, canvas);
    for(let i=0; i<10; i++) {
        if (i%2==0) {
            for (let s = 0; s < 35; s++) {
                setTimeout(() => {
                    d.transform(drawMoveUp);
                    d.transform(rotate);
                    center.x+=1;
                    center.y+=2;
                    d.draw();
                }, 100);
            }
        } else {
            for (let s = 0; s < 35; s++) {
                setTimeout(() => {
                    d.transform(drawMoveDown);
                    d.transform(rotate);
                    center.x+=1;
                    center.y-=2;
                    d.draw();
                }, 100);
            }
        }
    }
}

window.onload = ()=> {
    drawSmile(center.x, center.y);
    drawZigzag();
}






