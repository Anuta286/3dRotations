const Transformations = require('../../../Transformations');
const ComplexNumber = require('../../../ComplexNumber');
const EulerFormula = require('../../../EulerFormula');
const assert = require('assert');

describe('Transformations', ()=> {
    it('return rotated coordinates with trig', () => {
        pixel = Transformations.rotateWithTrig(0, 0, {x: 0, y: 0}, Math.PI/36);
        assert.equal(pixel.x, 0);
        assert.equal(pixel.y, 0);
    });

    it('return rotated coordinates with complex numbers', () => {
        pixel = Transformations.rotateWithComplexNumbers(0, 0, {x: 1, y: 1}, Math.PI/2);
        assert.equal(pixel.x, 2+);
        assert.equal(pixel.y, 0);
    });

});