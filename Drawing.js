class Drawing {
    constructor(ctx, w, h, imgData, canvas, points) {
        this.ctx = ctx;
        this.h = h;
        this.w = w;
        this.imgData = imgData;
        this.canvas = canvas;
        this.points = points;
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

    draw2() {
        this.imgData = this.ctx.createImageData(this.w, this.h);
        for(let point of this.points)
            this.setPixel(Math.round(point.x), Math.round(point.y));
        this.ctx.putImageData(this.imgData, 0, 0);
    }

    getAlpha (x, y) { return this.imgData.data[(x+y*this.w)*4+3]; }

    setAlpha (x, y, a) { this.imgData.data[(x+y*this.w)*4+3] = a; }

    transform (f) {
        const dOld = new Drawing(ctx, this.canvas.width, this.canvas.height, this.imgData, this.canvas, imgDataToPoints(this.imgData) );
        this.imgData = ctx.createImageData(this.canvas.width, this.canvas.height);
        this.points = [];
        for (let i=0; i<dOld.points.length; i++) {
            let newCoord = f(dOld.points[i].x, dOld.points[i].y);
            let o = {y: newCoord.y , x: newCoord.x}
            this.points.push(o);
        }
    }
}

function imgDataToPoints(imData) {
    let points = [];
    for(let i=3; i<imData.data.length; i+=4) {
        if (imData.data[i] != 0) {
            let y = Math.floor(((i-3)/4)/this.w)+1;
            let o = {y: y, x: ((i-3)/4)%y };
            points.push(o);
        }
    }
    return points;
}