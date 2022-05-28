'use strict'
if (typeof module !== 'undefined') {
    global.ComplexNumber = require('./ComplexNumber.js');
}

class EulerFormula {
    constructor(radians) {
        this.radians = radians;
    }

    toComplexNumber() {
        let re = Math.cos(this.radians);
        let im = Math.sin(this.radians);
        return new ComplexNumber(re, im);
    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = EulerFormula;
}