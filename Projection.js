'use strict'

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    global.Vector = require('./Vector');
}

class Projection {
    constructor(arrayOfDrawings, eye, plane, canvasWidth) {
        this.arrayOfDrawings = arrayOfDrawings;
        this.eye = eye;
        this.plane = plane;
        this.pixels = this.toCanvasPixels(this.projectAll(), canvasWidth);
        this.x = this._minX();
        this.y = this._minY();
    }
    _minX() {
        let f = Projection._fun(this.plane, this.eye);
        let minX = 900;
        for (let i=0; i<this.arrayOfDrawings.length; i++) {
            let p = f(this.arrayOfDrawings[i].x, this.arrayOfDrawings[i].y, this.arrayOfDrawings[i].z);
            if (p.x < minX) {
                minX = p.x;
            }
        }
        return minX;
    }

    _minY() {
        let f = Projection._fun(this.plane, this.eye);
        let minY = 400;
        for (let i=0; i<this.arrayOfDrawings.length; i++) {
            let p = f(this.arrayOfDrawings[i].x, this.arrayOfDrawings[i].y, this.arrayOfDrawings[i].z);
            if (p.y < minY) {
                minY = p.y;
            }
        }
        return minY;
    }

    projectAll() {
        let newArray = [];
        for (let i=0; i<this.arrayOfDrawings.length; i++) {
            let newD = Projection.project(this.arrayOfDrawings[i], this.plane, this.eye);
            newArray.push(newD);
        }
        return newArray;
    }

    static project(d, plane, eye) {
        let transformation = Projection._fun(plane, eye);
        const newPoints = [];
        for (let i=0; i<d.points.length; i++) {
            let newCoord = transformation(d.points[i].x, d.points[i].y, d.z);
            newPoints.push({y: newCoord.y , x: newCoord.x, z: newCoord.z});
        }
        return new Drawing(newPoints, d.x, d.y, d.z, d.transformations, d.translations);
    }

    static _fun(plane, eye) {
        return function (x0, y0, z0) {
            let v0 = new Vector([x0, y0, z0]);
            let t = (plane.d-plane.a*x0-plane.b*y0-plane.c*z0)/(plane.a*(eye.getComp(0)-x0)+plane.b*(eye.getComp(1)-y0)+plane.c*(eye.getComp(2)-z0));
            let result = eye.add(v0.times(-1)).times(t).add(v0);
            return {x: result.getComp(0), y: result.getComp(1), z: result.getComp(2)};
        }
    }

    toCanvasPixels(array, canvasWidth) {
        const pixels = [];
        pixels.fill(0);
        for (let i=0; i<this.arrayOfDrawings.length; i++) {
            for (let point of this.arrayOfDrawings[i].points) {
                const x = Math.round(point.x);
                const y = Math.round(point.y);
                const pixelIdx = x + y * canvasWidth;
                const pixelStart = pixelIdx*4;
                pixels[pixelStart+3] = 255;
            }
        }
        return pixels;
    }

    setPointsToImageData(imgDataData, value) {
        for (let p=0; p<this.pixels.length; p++) {
            if (this.pixels[p] !== 0) {
                imgDataData[this.pixels[p]] = value;
            }
        }
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Projection;
}