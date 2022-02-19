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
    const iterations = 70;
    let timeBefore = Date.now();

    const angularVelocity = .1;
    const velocity = new Vector([20, 13.4]);

    let d = new Drawing(imgDataToPoints(imgData), 0, 0,
        [Transformations.rotateWithMatricesAndVelocity(angularVelocity)],
        [(x, y, t) => {
            const newPosition = new Vector([x, y]).add(velocity.times(t));
            return {x: newPosition.getComp(0), y: newPosition.getComp(1)}
        }]);
    for (let s=0; s<iterations; s++) {
        setTimeout(() => {
            const initialDrawing = d;
            const timeNow = Date.now();
            const t = (timeNow - timeBefore) / 1000;
            d = d.move(t);

            const newCanvas = d.toCanvasPixels(canvas.width);
            for(let i=0; i<imgData.data.length; i++) {
                imgData.data[i] = newCanvas[i];
            }
            Drawing.setPointsToImageData(initialDrawing, imgData.data, 0, canvas.width);
            Drawing.setPointsToImageData(d, imgData.data , 255, canvas.width);
            ctx.putImageData(imgData, d.x, d.y);
            console.log("Attempt #" + s);
            timeBefore = timeNow;
        }, (s+1) * 100);
    }
}

window.onload = ()=> {
    initialDrawSmile(c.x, c.y);
    drawZigzag();
}
