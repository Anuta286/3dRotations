'use strict'

class ComplexNumber {
    constructor(re, im) {
        this.re = re;
        this.im = im;
    }

    times(that) {
        let r = this.re*that.re - this.im*that.im;
        let i = this.re*that.im + this.im*that.re;
        return new ComplexNumber(r, i);
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ComplexNumber;
}

