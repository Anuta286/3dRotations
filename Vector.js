'use strict'

class Vector {
    constructor(vector) {
        this.vector = vector;
        this.size = vector.length;
        this.length = () => {
            let sum = 0;
            for(let i=0; i<this.size; i++) {
                sum += this.vector[i]*this.vector[i];
            }
            return Math.sqrt(sum);
        }
    }

    getComp(idx) {
        return this.vector[idx];
    }

    dotProduct(another) {
        if (this.size === another.size) {
            let vNew = 0;
            for (let i=0; i<this.size; i++) {
                vNew += this.vector[i] * another.vector[i];
            }
            return vNew;
        } else {
            throw new Error (`Vector size (${this.size})  != another vector size (${another.size})`);
        }
    }

    times(scalar) {
        let vector = [];
        for (let i=0; i<this.size; i++) {
            vector[i] = scalar*this.vector[i];
        }
        return new Vector(vector);
    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Vector;
}