'use strict'

class Vector {
    constructor(vector) {
        this.vector = vector;
        this.length = vector.length;
    }

    dotProduct(another) {
        if (this.vector.length === another.length) {
            let vNew = 0;
            for (let i=0; i<this.length; i++) {
                vNew += this.vector[i] * another.vector[i];
            }
            return vNew;
        } else {
            throw new Error (`Vector length (${this.length})  != another vector length (${another.length})`);
        }
    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Vector;
}