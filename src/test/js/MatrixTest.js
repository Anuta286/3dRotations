const Matrix = require('../../../Matrix');
const Vector = require('../../../Vector');
const assert = require('assert');

describe('Matrix', ()=> {
    it('calculating dot product of two vectors', () => {
        const v1 = new Vector([0, 4]);
        const v2 = new Vector([3, 2]);
        assert.strictEqual(v1.dotProduct(v2), 8);
    });

    it('calculating dot product of two vectors 2', () => {
        const v1 = new Vector([0, 4, 2]);
        const v2 = new Vector([3, 2, 3]);
        assert.strictEqual(v1.dotProduct(v2), 14);
    });

    it('calculating dot product of two vectors 3', () => {
        const v1 = new Vector([0, 4, 2, 0]);
        const v2 = new Vector([3, 2, 3]);
        assert.throws(()=>v1.dotProduct(v2), Error, "Vector length (4)  != another vector length (3)");
    });

    it('calculating dot product of matrix and vector', () => {
        const m = new Matrix([new Vector([0, 1]), new Vector([1, 2])]);
        const v = new Vector([3, 2]);
        assert.strictEqual(m.timesVector(v).vector[0], 2);
        assert.strictEqual(m.timesVector(v).vector[1], 7);
    });

});
