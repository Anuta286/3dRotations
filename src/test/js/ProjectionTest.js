const Projection = require('../../../main/src/main/javaScript/Projection');
const Drawing = require('../../../main/src/main/javaScript/Drawing');
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

    it('return projected coordinates 2' , () => {
        let x = 2;
        let y = 2;
        let z = 2;
        let func = Projection._fun({a: 1, b: 1, c: 1, d: 0}, new Vector([10, 10, 10]));
        let p = func(x, y, z);
        assert.strictEqual(p.x, 0);
        assert.strictEqual(p.y, 0);
        assert.strictEqual(p.z, 0);
    });

    it('return projected coordinates 3' , () => {
        let x = 2;
        let y = 2;
        let z = 2;
        let func = Projection._fun({a: -1, b: 1, c: -1, d: 1}, new Vector([-10, -10, -10]));
        let p = func(x, y, z);
        assert.strictEqual(p.x, 1);
        assert.strictEqual(p.y, 1);
        assert.strictEqual(p.z, 1);
    });

    it('return projected coordinates 4' , () => {
        let x = 5;
        let y = -7;
        let z = 2;
        let func = Projection._fun({a: -41, b: -4, c: -1, d: 10}, new Vector([15, -10, -10]));
        let p = func(x, y, z);
        assert.strictEqual(Math.floor(p.x), Math.floor(120/193));
        assert.strictEqual(Math.floor(p.y), Math.floor(2195/-386));
        assert.strictEqual(Math.floor(p.z), Math.floor(1400/193));
    });

    it('trying to project in an unreal situation' , () => {
        let x = 0;
        let y = 0;
        let z = 1;
        let func = Projection._fun({a: 0, b: 0, c: 1, d: 0}, new Vector([0, 0, 1]));
        let p = func(x, y, z);
        assert.strictEqual(p.x, NaN);
        assert.strictEqual(p.y, NaN);
        assert.strictEqual(p.z, NaN);
    });

});