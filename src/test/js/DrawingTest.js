const Drawing = require('../../../Drawing');
const assert = require('assert');

describe('Drawing', ()=> {
    it('checking array length', () => {
        const d = new Drawing([], 0, 0);
        assert.strictEqual(d.points.length, 0);
    });

    it('checking array length 2', () => {
        const d = new Drawing([{x: 5, y: 7}, {x: 9, y: 3}], 0, 0);
        assert.strictEqual(d.points.length, 2);
    });

    it('checking value of element', () => {
        const d = new Drawing([{x: 5, y: 7}, {x: 9, y: 3}], 0, 0);
        assert.strictEqual(d.points[0].x, 5);
    });

    it('translate changes coordinates of whole drawing', () => {
        let d = new Drawing([{x: 1, y: 2}, {x: 2, y: 2}], 1, 2);
        d = d.translate((x, y) => {
            return {x: x+1, y: y+2}
        });
        assert.strictEqual(d.x, 2);
        assert.strictEqual(d.y, 4);
    });

    it('translate does not change points', () => {
        let d = new Drawing([{x: 1, y: 2}, {x: 2, y: 2}], 1, 2);
        d = d.translate((x, y) => {
            return {x: x+1, y: y+2}
        });
        assert.strictEqual(d.points[1].x, 2);
    });

});

