const Matrix = require('../../../Matrix');
const Vector = require('../../../Vector');
const assert = require('assert');

describe('Matrix', ()=> {
    it('calculating dot product of matrix and vector', () => {
        const m = new Matrix([new Vector([0, 1]), new Vector([1, 2])]);
        const v = new Vector([3, 2]);
        assert.strictEqual(m.timesVector(v).vector[0], 2);
        assert.strictEqual(m.timesVector(v).vector[1], 7);
    });

});
