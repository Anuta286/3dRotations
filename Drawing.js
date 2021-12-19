class Drawing {
    constructor(points) {
        this.points = points;
    }

    transform (f) {
        const newPoints = [];
        for (let i=0; i< this.points.length; i++) {
            let newCoord = f(this.points[i].x, this.points[i].y);
            newPoints.push({y: newCoord.y , x: newCoord.x});
        }
        return new Drawing(newPoints)
    }
    toCanvasPixels(canvasWidth) {
        const pixels = [];
        for (let point of this.points) {
            const x = Math.round(point.x);
            const y = Math.round(point.y);
            const pixelIdx = x + y * canvasWidth;
            const pixelStart = pixelIdx*4;
            // pixels[pixelStart]   = 0;
            // pixels[pixelStart+1] = 0;
            // pixels[pixelStart+2] = 0;
            pixels[pixelStart+3] = 255;
        }
        return pixels;
    }
}

