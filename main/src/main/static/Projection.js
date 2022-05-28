'use strict'

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    global.Vector = require('./Vector');
    global.Drawing = require('./Drawing');
}

class Projection {
    static project(eye, plane, d) {
        let transformation = Projection._fun(plane, eye);
        const newPoints = [];
        for (let i=0; i<d.points.length; i++) {
            let newCoord = transformation(d.points[i].x, d.points[i].y, d.z);
            newPoints.push({y: newCoord.y , x: newCoord.x, z: newCoord.z});
        }
        let newMainCoord = transformation(d.x, d.y, d.z);
        return new Drawing(newPoints, newMainCoord.x, newMainCoord.y, newMainCoord.z, d.transformations, d.translations);
    }

    static _fun(plane, eye) {
        return function (x0, y0, z0) {
            let v0 = new Vector([x0, y0, z0]);
            let t = -1*(plane.d+plane.a*x0+plane.b*y0+plane.c*z0)/(plane.a*(eye.getComp(0)-x0)+plane.b*(eye.getComp(1)-y0)+plane.c*(eye.getComp(2)-z0));
            let result = eye.add(v0.times(-1)).times(t).add(v0);
            return {x: result.getComp(0), y: result.getComp(1), z: result.getComp(2)};
        }
    }

}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Projection;
}