let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let plane = {a: 0, b: 0, c: 10, d: 50};
let eye = new Vector([0, 0, 100]);
let xzGo = new Vector([0, 0]);
let leftRight = 10;
/*function initialDrawSmile(xCenter, yCenter) {
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
}*/
/*function initialDrawHouse() {
    ctx.fillRect(50, 75, 20, 100);
    ctx.fillRect(50, 75, 100, 30);
    ctx.fillRect(100, 75, 50, 100);
    ctx.fillRect(50, 160, 100, 30);
    ctx.beginPath();
    ctx.moveTo(50,75);
    ctx.lineTo(150,75);
    ctx.lineTo(100,25);
    ctx.fill();
} */

function imgDataToPoints(imData) {
    const points = [];
    for(let i=3; i<imData.length; i+=4) {
        if (imData[i] !== 0) {
            const pixelIdx = (i - 3) / 4;
            const y = Math.floor(pixelIdx/canvas.width)+1;
            const point = {y: y, x: pixelIdx % canvas.width, z: -5};
            points.push(point);
        }
    }
    return points;
}

function getDataFromServer(pic){
    const httpRequest = new XMLHttpRequest();
    httpRequest.onload = function() {
        const text = httpRequest.responseText;
        let data = text.split(',');
        drawZigzag(data);
    };
    if (pic===1) {
        httpRequest.open("GET", "/drawing/1", true);
    } else if (pic===2) {
        httpRequest.open("GET", "/drawing/2", true);
    }
    httpRequest.send();
}

function drawZigzag(data) {
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    imgData.data.set(data);
    let timeBefore = Date.now();
    const angularVelocity = 1;
    const velocity = new Vector([20, 13.4, 0]);
    let d = new Drawing(imgDataToPoints(imgData.data), 0, 0, -5,
        [Transformations.rotateWithMatricesAndVelocity(angularVelocity)],
        [(x, y, z, t) => {
            const newPosition = new Vector([x, y, z]).add(velocity.times(t));
            return {x: Math.round(newPosition.getComp(0)), y: Math.round(newPosition.getComp(1)), z: Math.round(newPosition.getComp(2))}
        }]  );
    function render() {
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
    getDataFromServer(2);
}
function goEye (eye, plane) {
    eye.setComp(2, eye.getComp(2)+xzGo.getComp(1));
    plane.z += xzGo.getComp(1);
    eye.setComp(0, eye.getComp(0)+xzGo.getComp(0));
    plane.x += xzGo.getComp(0);
    return {pl: plane, e: eye};
}
