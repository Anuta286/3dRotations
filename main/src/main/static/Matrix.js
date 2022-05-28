'use strict'
if (typeof module !== 'undefined') {
    global.Vector = require('./Vector.js');
}

class Matrix {
    constructor(matrix) {
        this.matrix = matrix;
    }

    timesVector(v) {
        if (this.matrix.length === v.size) {
            let array = [];
            for (let i=0; i<this.matrix.length; i++) {
                array.push(this.matrix[i].dotProduct(v));
            }
            return new Vector(array);
        } else {
            throw new Error (`Matrix columns (${this.matrix.length})  != v.length (${v.size})`);
        }
    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Matrix;
}