'use strict'

class Drawing {
    constructor(points, x, y) {
        this.points = points;
        this.x = x;
        this.y = y;
    }

    translate (f) {
        let newCoord = f(this.x, this.y);
        return new Drawing(this.points, newCoord.x, newCoord.y);
    }

    transform (f, ifMovement) {
        if (!ifMovement) {
            const newPoints = [];
            for (let i=0; i< this.points.length; i++) {
                let newCoord = f(this.points[i].x, this.points[i].y);
                newPoints.push({y: newCoord.y , x: newCoord.x});
            }
            return new Drawing(newPoints, this.x, this.y);
        } else {
            return translate(f);
        }
    }



    toCanvasPixels(canvasWidth) {
        const pixels = [];
        for (let point of this.points) {
            const x = Math.round(point.x);
            const y = Math.round(point.y);
            const pixelIdx = x + y * canvasWidth;
            const pixelStart = pixelIdx*4;
            pixels[pixelStart+3] = 255;
        }
        return pixels;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Drawing;
}
