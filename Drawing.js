class Drawing {
    constructor(ctx, w, h, imgData) {
        this.ctx = ctx;
        this.h = h;
        this.w = w;
        this.imgData = imgData;
    }

    setPixel(x, y) {
        this.imgData.data[(x+y*this.w)*4]   = 0;
        this.imgData.data[(x+y*this.w)*4+1] = 0;
        this.imgData.data[(x+y*this.w)*4+2] = 0;
        this.imgData.data[(x+y*this.w)*4+3] = 255;
    }

    setColoredPixel(x, y, r, g, b, alpha) {
        this.imgData.data[(x+y*this.w)*4]   = r;
        this.imgData.data[(x+y*this.w)*4+1] = g;
        this.imgData.data[(x+y*this.w)*4+2] = b;
        this.imgData.data[(x+y*this.w)*4+3] = alpha;
    }

    draw() { this.ctx.putImageData(this.imgData, 0, 0); }

    getAlpha (x, y) {
        return this.imgData.data[(x+y*this.w)*4+3];
    }

    setAlpha (x, y, a) {
        this.imgData.data[(x+y*this.w)*4+3] = a;
    }



}

/*window.onload = ()=> {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let d = new Drawing(ctx, canvas.width, canvas.height, imgData);
    for(let i = 0; i < 100; i++) { d.setColoredPixel(i, i, 0, 0, 0, 255); }
    d.draw();
} */


