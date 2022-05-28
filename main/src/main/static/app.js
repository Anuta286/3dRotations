let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let c = {x: 75, y: 75, z: -5};
let plane = {a: 1, b: 1, c: 10, d: 50};
let eye = new Vector([0, 0, 100]);
let xzGo = new Vector([0, 0]);
let leftRight = 10;
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
    let timeBefore = Date.now();
    const angularVelocity = 1;
    const velocity = new Vector([20, 13.4, 0]);
    let d = new Drawing(imgDataToPoints(imgData), 0, 0, -5,
        [Transformations.rotateWithMatricesAndVelocity(angularVelocity)],
        [(x, y, z, t) => {
            const newPosition = new Vector([x, y, z]).add(velocity.times(t));
            return {x: Math.round(newPosition.getComp(0)), y: Math.round(newPosition.getComp(1)), z: Math.round(newPosition.getComp(2))}
        }]  );
    function render() {
        //const initialDrawing = d;
        const timeNow = Date.now();
        const t = (timeNow - timeBefore) / 1000;
        plane = RotationPlane.rotatePlane(eye, plane, leftRight);
        goEye(eye, plane);
        d = d.move(t);
        let projection = Projection.project(eye, plane, d);
        const newCanvas = projection.toCanvasPixels(canvas.width);
        for(let i=0; i<imgData.data.length; i++) {
            imgData.data[i] = newCanvas[i];
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //Drawing.setPointsToImageData(initialDrawing, imgData.data, 0, canvas.width);
        //Drawing.setPointsToImageData(projection, imgData.data , 255, canvas.width);
        ctx.putImageData(imgData, projection.x, projection.y);
        timeBefore = timeNow;
        xzGo.setComp(0, 0);
        xzGo.setComp(1, 0);
        leftRight = 0;
        requestAnimationFrame(render);
    }
    render();
}

window.onload = ()=> {
    initialDrawSmile(c.x, c.y);
    window.addEventListener('keydown', (event) => {
        if (event.key === 'w') {
            xzGo.setComp(1, xzGo.getComp(1)-10);
            console.log("w");
        }
        if (event.key === 's') {
            xzGo.setComp(1, xzGo.getComp(1)+10);
            console.log("s");
        }
        if (event.key === 'a') {
            xzGo.setComp(0, xzGo.getComp(1)+10);
            console.log("a");
        }
        if (event.key === 'd') {
            xzGo.setComp(0, xzGo.getComp(1)-10);
            console.log("d");
        }
    });
    window.addEventListener('wheel', function(e) {
        if (e.deltaY>0) {
            leftRight += 10;
        } else if (e.deltaY<0) {
            leftRight -= 10;
        }
        console.log(leftRight)
    });
    drawZigzag();
}
function goEye (eye, plane) {
    eye.setComp(2, eye.getComp(2)+xzGo.getComp(1));
    plane.z += xzGo.getComp(1);
    eye.setComp(0, eye.getComp(0)+xzGo.getComp(0));
    plane.x += xzGo.getComp(0);
    return {pl: plane, e: eye};
}
/*
function goR (d) {
    const m = new Matrix([new Vector([Math.cos(angle), Math.sin(angle)]), new Vector([-1*Math.sin(angle), Math.cos(angle)])]);
    let v = new Vector([d.eye.x-d.center.x, d.center.y-d.eye.y]);
    let newV = m.timesVector(v);
    d.eye.x = newV.vector[0]+d.center.x;
    d.eye.y = d.center.y-newV.vector[1];
    return d;
}
*/