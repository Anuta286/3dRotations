'use strict'

class Drawing {
    constructor(points, x, y, transformations, translations) {
        this.points = points;
        this.x = x;
        this.y = y;
        this.center = this._findCenter();
        this.transformations = transformations;
        this.translations = translations;
    }

    move(t) {
        let d = this;
        for (let i = 0; i < this.translations.length; i++)
            d = this.translate(this.translations[i], t);
        for (let transformation of this.transformations)
            d = d.transform(transformation, t);
        return d;
    }

    translate(f, t) {
        let newCoord = f(this.x, this.y, t);
        return new Drawing(this.points, newCoord.x, newCoord.y, this.transformations, this.translations);
    }

    transform(f, t) {
        let transformation = f(t);
        const newPoints = [];
        for (let i=0; i< this.points.length; i++) {
            let newCoord = transformation(this.points[i].x, this.points[i].y, this.center);
            newPoints.push({y: newCoord.y , x: newCoord.x});
        }
        return new Drawing(newPoints, this.x, this.y, this.transformations, this.translations);
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
