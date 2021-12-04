class Drawing {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.h = h;
        this.w = w;
    }

    setPixel(x, y) {
        let imgData = this.ctx.getImageData(0, 0, this.w, this.h);
        imgData.data[(x+y*this.w)*4]   = 0;
        imgData.data[(x+y*this.w)*4+1] = 0;
        imgData.data[(x+y*this.w)*4+2] = 0;
        imgData.data[(x+y*this.w)*4+3] = 255;
        this.ctx.putImageData(imgData, 0, 0);
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

window.onload = ()=>{
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let d = new Drawing(ctx, canvas.width, canvas.height);
//d.setColoredPixel(50, 50, 100, 70, 200, 1);
    for(let i = 0; i < 100; i++)
        d.setPixel(i, i);
};
