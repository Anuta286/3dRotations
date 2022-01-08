const EulerFormula = require('../../../EulerFormula');
const assert = require('assert');

describe('EulerFormula', ()=> {
    it('return complex number', () => {
        const e = new EulerFormula(3.14);
        cn = e.toComplexNumber();
        assert.strictEqual(cn.re, -1);
        assert.strictEqual(cn.im, 0);
    });

});
