'use strict'

class Projection {
    static project(d) {
        let transformation = Projection._fun(d.plane, d.eye);
        const newPoints = [];
        for (let i=0; i<d.points.length; i++) {
            let newCoord = transformation(d.points[i].x, d.points[i].y, d.z);
            newPoints.push({y: newCoord.y , x: newCoord.x, z: newCoord.z});
        }
        return new Drawing(newPoints, d.x, d.y, d.z, d.transformations, d.translations, d.plane, d.eye);
    }

    static _fun(plane, eye) {
        return function (x0, y0, z0) {
            let t = (plane.d-plane.a*x0-plane.b*y0-plane.c*z0)/(plane.a*(eye.x-x0)+plane.b*(eye.y-y0)+plane.c*(eye.z-z0));
            let newX = (eye.x-x0)*t+x0;
            let newY = (eye.y-y0)*t+y0;
            let newZ = (eye.z-z0)*t+z0;
            return {x: newX, y: newY, z: newZ};
        }
    }
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = Projection;
}