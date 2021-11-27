let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let l = 300;
let w = 150;
let newImgData = ctx.createImageData(l, w);
function draw() {
  if (canvas.getContext) {
    ctx.beginPath();
    ctx.arc(75, 75, 50, 0, Math.PI*2, true);
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
    let imgData = ctx.getImageData(0, 0, l, w).data;
    let newImgData = ctx.createImageData(l, w);
    for(let n=3; n<imgData.length; n+=4) {
      if(imgData[n]>0) {
        let x = ((n-3)/4)%w;
        let y = ((n-3)/4-x)/w;
        let newN = (x+1+(y+2)*w)*4+3;
        newImgData.data[newN] = imgData[n];
      }
    }
    ctx.putImageData(newImgData, 0, 0);
}
function newDrawSecond() {
    let imgData = ctx.getImageData(0, 0, l, w).data;
    let newImgData = ctx.createImageData(l, w);
    for(let n=3; n<imgData.length; n+=4) {
      if(imgData[n]>0) {
        let x = ((n-3)/4)%w;
        let y = ((n-3)/4-x)/w;
        let newN = (x+1+(y-2)*w)*4+3;
        newImgData.data[newN] = imgData[n];
      }
    }
    ctx.putImageData(newImgData, 0, 0);
}
function drawZigzag() {
    while(i<10) {
        let i = 0;
        if(i%2==0) {
            for(let s=0; s<100; s++) {
                setTimeout(newDrawFirst, 20);
            }
        } else {
            for(let s=0; s<100; s++) {
                setTimeout(newDrawSecond, 20);
            }
        }
        i++;
    }
}
draw();
//drawZigzag();
for(let s=0; s<100; s++) {
    setTimeout(newDrawSecond, 20);
}
for(let s=0; s<100; s++) {
    setTimeout(newDrawFirst, 20);
}





