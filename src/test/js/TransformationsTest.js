const Transformations = require('../../../Transformations');
const ComplexNumber = require('../../../ComplexNumber');
const EulerFormula = require('../../../EulerFormula');
const assert = require('assert');

describe('Transformations', ()=> {
    it('return rotated coordinates with trig', () => {
        const pixel = Transformations.rotateWithTrig(Math.PI/36)(0, 0, {x: 0, y: 0});
        assert.equal(pixel.x, 0);
        assert.equal(pixel.y, 0);
    });

    it('return rotated coordinates with complex numbers', () => {
        const pixel = Transformations.rotateWithComplexNumbers(Math.PI/2)(1, 1, {x: 1, y: 1});
        assert.equal(pixel.x, 1);
        assert.equal(pixel.y, 1);
    });

    it('return rotated coordinates with complex numbers 2', () => {
        const pixel = Transformations.rotateWithComplexNumbers(Math.PI)(0, 0, {x: 1, y: 1});
        assert.equal(pixel.x, 2);
        assert.equal(pixel.y, 2);
    });

    it('return rotated coordinates with complex numbers 3', () => {
        const pixel = Transformations.rotateWithComplexNumbers(Math.PI*2)(1, 1, {x: 1, y: 1});
        assert.equal(pixel.x, 1);
        assert.equal(pixel.y, 1);
    });

    it('return rotated coordinates with matrices', () => {
        const pixel = Transformations.rotateWithMatrices(Math.PI/2)(0, 0, {x: 1, y: 1});
        assert.equal(pixel.x, 2);
        assert.equal(pixel.y, 0);
    });

});