'use strict'

class Drawing {
    constructor(points, x, y) {
        this.center = {x:75, y:75};
        this.points = points;
        this.x = x;
        this.y = y;
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

    findCenter() {
        let maxX = findMaxX();
        let minX = findMinX();
        let maxY = findMaxY();
        let minY = findMinY();
        return {x: Math.round((maxX+minX)/2), y: Math.round((maxY+minY)/2)};
    }

    findMaxX() {
        let max = -99999999999;
        for (let i=0; i<this.points.length; i++) {
            if (max<this.points[i].x) {
                max = this.points[i].x;
            }
        }
        return max;
    }

    findMinX() {
        let min = 99999999999;
        for (let i=0; i<this.points.length; i++) {
            if (min>this.points[i].x) {
                min = this.points[i].x;
            }
        }
        return min;
    }

    findMaxY() {
        let max = -99999999999;
        for (let i=0; i<this.points.length; i++) {
            if (max<this.points[i].y) {
                max = this.points[i].y;
            }
        }
        return max;
    }

    findMinY() {
        let min = 99999999999;
        for (let i=0; i<this.points.length; i++) {
            if (min>this.points[i].y) {
                min = this.points[i].y;
            }
        }
        return min;
    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Drawing;
}
