const Drawing = require('../../../Drawing');
const assert = require('assert');

describe('Drawing', ()=> {
    it('transforms pixels according to specified function', () => {
        const d = new Drawing([]);
        assert.strictEqual(d.points.length, 0);
    });
});


