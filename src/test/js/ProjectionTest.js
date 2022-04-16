const Projection = require('../../../Projection');
const assert = require('assert');

describe('Projection', ()=> {
    it('return projected coordinates', () => {
        const plane = {a: 1, b: 1, c: 1, d: 1};
        const eye = {x: 1, y: 0, z: 1};
        const f = Projection._fun(plane, eye);
        assert.strictEqual(f(0, 0, 0).x, 0.5);
        assert.strictEqual(f(0, 0, 0).y, 0);
        assert.strictEqual(f(0, 0, 0).z, 0.5);
    });

});