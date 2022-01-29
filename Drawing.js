'use strict'

class Drawing {
    constructor(points, x, y) {
        this.points = points;
        this.x = x;
        this.y = y;
        this.center = this._findCenter();
    }

    translate(f) {
        let newCoord = f(this.x, this.y);
        return new Drawing(this.points, newCoord.x, newCoord.y);
    }

    transform(f) {
        const newPoints = [];
        for (let i=0; i< this.points.length; i++) {
            let newCoord = f(this.points[i].x, this.points[i].y, this.center);
            newPoints.push({y: newCoord.y , x: newCoord.x});
        }
        return new Drawing(newPoints, this.x, this.y);
    }

    toCanvasPixels(canvasWidth) {
        const pixels = [];
        pixels.fill(0);
        for (let point of this.points) {
            const x = Math.round(point.x);
            const y = Math.round(point.y);
            const pixelIdx = x + y * canvasWidth;
            const pixelStart = pixelIdx*4;
            pixels[pixelStart+3] = 255;
        }
        return pixels;
    }

    static setPointsToImageData(drawing, imgDataData, value, w) {
        for (let p=0; p<drawing.points.length; p++) {
            imgDataData[(drawing.points[p].x+drawing.points[p].y*w)*4+3] = value;
        }
    }

    _findCenter() {
        let maxX = this._findMax((p) => p.x);
        let minX = this._findMin((p) => p.x);
        let maxY = this._findMax((p) => p.y);
        let minY = this._findMin((p) => p.y);
        return {x: Math.round((maxX+minX)/2), y: Math.round((maxY+minY)/2)};
    }

    _findMax(toPrimitive) {
        let max = Number.MIN_SAFE_INTEGER;
        for (let i=0; i<this.points.length; i++) {
            let primitive = toPrimitive(this.points[i]);
            if (max < primitive) {
                max = primitive;
            }
        }
        return max;
    }

    _findMin(toPrimitive) {
        let min = Number.MAX_SAFE_INTEGER;
        for (let i=0; i<this.points.length; i++) {
            let primitive = toPrimitive(this.points[i]);
            if (min > primitive) {
                min = primitive;
            }
        }
        return min;
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Drawing;
}
