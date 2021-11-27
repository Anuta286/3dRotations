class Drawing {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.h = h;
        this.w = w;
    }

    setPixel(x, y) {
        let imgData = ctx.getImageData(0, 0, w, h);
        imgData.data[(x+y*w)*4] = 0;
        imgData.data[(x+y*w)*4+1] = 0;
        imgData.data[(x+y*w)*4+2] = 0;
        imgData.data[(x+y*w)*4+3] = 1;
        ctx.putImageData(imgData, 0, 0);

    }

    setColoredPixel(x, y, r, g, b, alpha) {
		let imgData = ctx.getImageData(0, 0, x, y);
        imgData.data[imgData.data.length-4] = r;
        imgData.data[imgData.data.length-3] = g;
        imgData.data[imgData.data.length-2] = b;
        imgData.data[imgData.data.length-1] = alpha;
        ctx.putImageData(imgData, 0, 0);
    }

    //getImageData() { return imgData; }
}

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let d = new Drawing(ctx, 300, 150);
//d.setColoredPixel(50, 50, 100, 70, 200, 1);
d.setPixel(30, 30);