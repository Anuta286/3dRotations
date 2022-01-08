'use strict'

class Transformations {
    static rotateWithTrig(x, y, center) {
        let oldCoord = {x: x - center.x, y: center.y - y};
        const angle = Math.PI/36;
        let newX = center.x + oldCoord.x*Math.cos(angle) - oldCoord.y*Math.sin(angle);
        let newY = -(-center.y + oldCoord.x*Math.sin(angle) + oldCoord.y*Math.cos(angle));
        return {x: newX, y: newY};
    }

    static rotateWithComplexNumbers(x, y) {
        const angle = Math.PI/36; //  let oldCoord = {x: x - center.x, y: center.y - y}; пототм опять рез переведи в норм систему коорд
        let cn1 = new ComplexNumber(x, y);
        let cn2 = new EulerFormula(angle).toComplexNumber();
        let cn3 = cn1.times(cn2);
        return {x: cn3.re, y: cn3.im};
    }

    static rotateWithMatrices(x, y) {

    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Transformations;
}