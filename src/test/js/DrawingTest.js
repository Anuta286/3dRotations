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

    it('transform with movement-function', () => {
        let d = new Drawing([{x: 1, y: 2}, {x: 2, y: 2}], 1, 2);
        d = d.transform((x, y) => {
            return {x: x+1, y: y+2}
        }, true);
        assert.strictEqual(d.x, 2);
        assert.strictEqual(d.y, 4);
    });

    it('translate does not change points', () => {
        let d = new Drawing([{x: 1, y: 2}, {x: 2, y: 2}], 1, 2);
        let sign = -1;
        d = d.transform((x, y) => {
            return {x: x+1, y: y+2*sign}
        }, true);
        assert.strictEqual(d.points[1].x, 2);
    });

    it('transform with rotation-function', () => {
        let d = new Drawing([{x: 75, y: 75}, {x: 76, y: 75}], 3, 5);
        d = d.transform(rotate);
        assert.strictEqual(d.points[0].x.toFixed(2), '75.00');
    });

    it('transform with rotation-function 2', () => {
        let d = new Drawing([{x: 75, y: 75}, {x: 76, y: 75}], 3, 5);
        d = d.transform(rotate);
        assert.strictEqual(d.points[0].y.toFixed(2), '75.00');
    });

    it('transform with rotation-function 3', () => {
        let d = new Drawing([{x: 0, y: 1}, {x: 1, y: 1}], 3, 5);
        d = d.transform(rotate);
        assert.strictEqual(d.x, 3);
    });

});

let center = {x: 75, y: 75};
function rotate(x, y) {
     let oldCoord = {x: x - center.x, y: center.y - y};
     const angle = Math.PI/36;
     let newX = center.x + oldCoord.x*Math.cos(angle) - oldCoord.y*Math.sin(angle);
     let newY = -(-center.y + oldCoord.x*Math.sin(angle) + oldCoord.y*Math.cos(angle));
     return {x: newX, y: newY};
}


