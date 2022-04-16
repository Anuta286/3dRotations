let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let c = {x: 75, y: 75, z: -5};
let plane = {a: 0, b: 0, c: 1, d: 50};
let eye = {x: 0, y: 0, z: 100};
let zGo = 0;
let xGo = 0;
let t = 1;
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
            const point = {y: y, x: pixelIdx % canvas.width, z: -5};
            points.push(point);
        }
    }
    return points;
}

function drawZigzag() {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const iterations = 500;
    let timeBefore = Date.now();

    const angularVelocity = 1;
    const velocity = new Vector([20, 13.4, 0]);

    let d = new Drawing(imgDataToPoints(imgData), 0, 0, -5,
        [Transformations.rotateWithMatricesAndVelocity(angularVelocity)],
        [(x, y, z, t) => {
            const newPosition = new Vector([x, y, z]).add(velocity.times(t));
            return {x: newPosition.getComp(0), y: newPosition.getComp(1), z: newPosition.getComp(2)}
        }], plane, eye);
    for (let s=0; s<iterations; s++) {
        setTimeout(() => {
            const initialDrawing = d;
            const timeNow = Date.now();
            const t = (timeNow - timeBefore) / 1000;
            d = d.move(t);
            d = goEye(d);
            //d = goAD(d);
            let projection = Projection.project(d);
            const newCanvas = projection.toCanvasPixels(canvas.width);
            for(let i=0; i<imgData.data.length; i++) {
                imgData.data[i] = newCanvas[i];
            }
            Drawing.setPointsToImageData(initialDrawing, imgData.data, 0, canvas.width);
            Drawing.setPointsToImageData(projection, imgData.data , 255, canvas.width);
            ctx.putImageData(imgData, projection.x, projection.y);
            console.log("Attempt #" + s);
            timeBefore = timeNow;
            zGo = 0;
            xGo = 0;
        }, (s+1) * 100);
    }
}

window.onload = ()=> {
    initialDrawSmile(c.x, c.y);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'w') {
            zGo += 10;
        }
        if (event.key === 's') {
            zGo += -10;
        }
        if (event.key === 'a') {
            xGo += 10;
        }
        if (event.key === 'd') {
            xGo += -10;
        }
    });
    drawZigzag();
}
function goEye (d) {

    d.eye.z += zGo;
    d.plane.z += zGo;
    d.eye.x += xGo;
    d.plane.x += xGo;
    return d;
}
/*
function goR (d) {
    let angle;
    if (aGo) {
        angle = Math.PI/90;
        console.log("a");
    }
    if (dGo) {
        angle = -1*Math.PI/90;
        console.log("d");
    }
    if (aGo || dGo) {
        const m = new Matrix([new Vector([Math.cos(angle), Math.sin(angle)]), new Vector([-1*Math.sin(angle), Math.cos(angle)])]);
        let v = new Vector([d.eye.x-d.center.x, d.center.y-d.eye.y]);
        let newV = m.timesVector(v);
        d.eye.x = newV.vector[0]+d.center.x;
        d.eye.y = d.center.y-newV.vector[1];
    }
    return d;
} */


