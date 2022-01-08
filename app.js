let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let c = {x: 75, y: 75};
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
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let d = new Drawing(imgDataToPoints(imgData), 0, 0);
    const iterations = 70;
    for (let s=0; s<iterations; s++) {
        setTimeout(() => {
            let sign = s < iterations/2 ? 1 : -1;
            let initialDrawing = d;
            d = d.translate((x, y) => {
                return {x: x+1, y: y+2*sign}
            });
            d = d.transform(Transformations.rotateWithComplexNumbers);

            const newCanvas = d.toCanvasPixels(canvas.width);
            for(let i=0; i<imgData.data.length; i++) {
                imgData.data[i] = newCanvas[i];
            }
            Drawing.setPointsToImageData(initialDrawing, imgData.data, 0, canvas.width);
            Drawing.setPointsToImageData(d, imgData.data , 255, canvas.width);
            ctx.putImageData(imgData, d.x, d.y);
            console.log("Attempt #" + s);
        }, (s+1) * 100);
    }
}

window.onload = ()=> {
    initialDrawSmile(c.x, c.y);
    drawZigzag();
}
