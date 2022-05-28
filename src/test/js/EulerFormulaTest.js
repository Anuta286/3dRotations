const EulerFormula = require('../../../main/src/main/javaScript/EulerFormula');
const ComplexNumber = require('../../../main/src/main/javaScript/ComplexNumber');
const assert = require('assert');

describe('EulerFormula', ()=> {
    it('return complex number', () => {
        const e = new EulerFormula(3.14);
        cn = e.toComplexNumber();
        assert.strictEqual(cn.re.toFixed(2), "-1.00");
        assert.strictEqual(cn.im.toFixed(2), "0.00");
    });

});
