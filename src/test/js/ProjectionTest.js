const Projection = require('../../../Projection');
const Drawing = require('../../../Drawing');
const assert = require('assert');

describe('Projection', ()=> {
    it('return projected coordinates', () => {
        const plane = {a: 1, b: 1, c: 1, d: 0};
        const eye = new Vector([0, 0, 10]);
        const d = new Drawing([{x: 0, y:0, z: -10}, {x: 1, y:1, z: -10}, {x: 2, y:2, z: -10}], 0, 0, -10);
        const p = Projection.project(eye, plane, d);
        assert.strictEqual(p.points[0].x, 0);
        assert.strictEqual(p.points[1].y.toFixed(1), "0.6");
        assert.strictEqual(p.points[2].z, -2.5);
    });

});