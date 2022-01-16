'use strict'
if (typeof module !== 'undefined') {
    global.ComplexNumber = require('./ComplexNumber.js');
    global.EulerFormula = require('./EulerFormula.js');
}


class Transformations {
    static rotateWithTrig(x, y, center, angle) {
        let oldCoord = {x: x - center.x, y: center.y - y};
        let newX = center.x + oldCoord.x*Math.cos(angle) - oldCoord.y*Math.sin(angle);
        let newY = -(-center.y + oldCoord.x*Math.sin(angle) + oldCoord.y*Math.cos(angle));
        return {x: newX, y: newY};
    }

    static rotateWithComplexNumbers(x, y, center, angle) {
        let oldCoord = {x: x - center.x, y: center.y - y};
        let cn1 = new ComplexNumber(oldCoord.x, oldCoord.y);
        let cn2 = new EulerFormula(angle).toComplexNumber();
        let cn3 = cn1.times(cn2);
        return {x: cn3.re+center.x, y: center.y-cn3.im};
    }

    static rotateWithMatrices(x, y) {

    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Transformations;
}