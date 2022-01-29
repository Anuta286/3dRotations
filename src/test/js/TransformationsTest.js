const Transformations = require('../../../Transformations');
const ComplexNumber = require('../../../ComplexNumber');
const EulerFormula = require('../../../EulerFormula');
const assert = require('assert');

describe('Transformations', ()=> {
    it('return rotated coordinates with trig', () => {
        const pixel = Transformations.rotateWithTrig(0, 0, {x: 0, y: 0}, Math.PI/36);
        assert.equal(pixel.x, 0);
        assert.equal(pixel.y, 0);
    });

    it('return rotated coordinates with complex numbers', () => {
        const pixel = Transformations.rotateWithComplexNumbers(1, 1, {x: 1, y: 1}, Math.PI/2);
        assert.equal(pixel.x, 1);
        assert.equal(pixel.y, 1);
    });

    it('return rotated coordinates with complex numbers 2', () => {
        const pixel = Transformations.rotateWithComplexNumbers(0, 0, {x: 1, y: 1}, Math.PI);
        assert.equal(pixel.x, 2);
        assert.equal(pixel.y, 2);
    });

    it('return rotated coordinates with complex numbers', () => {
        const pixel = Transformations.rotateWithComplexNumbers(1, 1, {x: 1, y: 1}, Math.PI*2);
        assert.equal(pixel.x, 1);
        assert.equal(pixel.y, 1);
    });

    it('return rotated coordinates with matrices', () => {
        const pixel = Transformations.rotateWithMatrices(0, 0, {x: 1, y: 1}, Math.PI/2);
        assert.equal(pixel.x, 2);
        assert.equal(pixel.y, 0);
    });

});