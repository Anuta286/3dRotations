const Vector = require('../../../Vector');
const assert = require('assert');

describe('Vector', ()=> {
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

    it('return length of a vector', () => {
        const v = new Vector([3, 4]);
        assert.strictEqual(v.length(), 5);
    });

    it('calculating multiplication vector with scalar', () => {
        const v = new Vector([1, 4, 0]);
        assert.equal(v.times(2).vector[0], 2);
        assert.equal(v.times(2).vector[1], 8);
        assert.equal(v.times(2).vector[2], 0);
    });

});
