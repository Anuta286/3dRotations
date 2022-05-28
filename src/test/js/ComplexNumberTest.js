const ComplexNumber = require('../../../main/src/main/javaScript/ComplexNumber');
const assert = require('assert');

describe('ComplexNumber', ()=> {
    it('multiplication with re and im', () => {
        let cn1 = new ComplexNumber(1, 2);
        let cn2 = new ComplexNumber(2, 1);
        assert.strictEqual(cn1.times(cn2).re, 0);
        assert.strictEqual(cn1.times(cn2).im, 5);
    });

    it('multiplication with im', () => {
        let cn1 = new ComplexNumber(0, 2);
        let cn2 = new ComplexNumber(0, 1);
        assert.strictEqual(cn1.times(cn2).re, -2);
        assert.strictEqual(cn1.times(cn2).im, 0);
    });

    it('multiplication with re', () => {
        let cn1 = new ComplexNumber(1, 0);
        let cn2 = new ComplexNumber(2, 0);
        assert.strictEqual(cn1.times(cn2).re, 2);
        assert.strictEqual(cn1.times(cn2).im, 0);
    });
});