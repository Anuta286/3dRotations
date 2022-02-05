'use strict'
if (typeof module !== 'undefined') {
    global.ComplexNumber = require('./ComplexNumber.js');
    global.EulerFormula = require('./EulerFormula.js');
    global.Vector = require('./Vector.js');
    global.Matrix = require('./Matrix.js');
}


class Transformations {

    static rotateWithMatrices(angle) {
        const m = new Matrix([new Vector([Math.cos(angle), Math.sin(angle)]), new Vector([-1*Math.sin(angle), Math.cos(angle)])]);
        return function(x, y,  center) {
            let v = new Vector([x-center.x, center.y-y]);
            let newV = m.timesVector(v);
            return {x: newV.vector[0]+center.x , y:  center.y-newV.vector[1]};
        };
    }

    static rotateWithTrig(angle) {
        return function (x, y, center) {
            let oldCoord = {x: x - center.x, y: center.y - y};
            let newX = center.x + oldCoord.x * Math.cos(angle) - oldCoord.y * Math.sin(angle);
            let newY = -(-center.y + oldCoord.x * Math.sin(angle) + oldCoord.y * Math.cos(angle));
            return {x: newX, y: newY};
        }
    }

    static rotateWithComplexNumbers(angle) {
        return function (x, y, center) {
            let oldCoord = {x: x - center.x, y: center.y - y};
            let cn1 = new ComplexNumber(oldCoord.x, oldCoord.y);
            let cn2 = new EulerFormula(angle).toComplexNumber();
            let cn3 = cn1.times(cn2);
            return {x: cn3.re + center.x, y: center.y - cn3.im};
        }
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Transformations;
}