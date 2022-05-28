'use strict'

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    global.Vector = require('./Vector');
    global.Transformations = require('./Transformations');
}

class RotationPlane {

    static rotatePlane(eye, plane, leftRight) {
        let points = RotationPlane.findPointsOnPlane(plane);
        while (RotationPlane.ifPointsBelongToOneLine(points)) {
            points = RotationPlane.findPointsOnPlane(plane);
        }
        let func = Transformations.rotateWithMatrices((Math.PI/90)*leftRight);
        let newPoints = [];
        for (let i=0; i<points.length; i++) {
            let p = func(points[i].x, points[i].y, {x: eye.getComp(0), y: eye.getComp(1)});
            newPoints.push({x: Math.floor(p.x*100)/100, y:  Math.floor(p.y*100)/100, z: points[i].z});
        }
        let newPlane = RotationPlane.findPlaneOfPoints(newPoints);
        return newPlane;
        // find 3 points on initial plane, rotate them around line though the eye, and calculate rotated plane.
    }

    static findPointsOnPlane(plane) {
        let points = [];
        for (let i=0; i<3; i++) {
            points.push(RotationPlane.findSinglePointOnPlane(plane));
        }
        return points;
    }

    static findSinglePointOnPlane(plane) {
        let x,y,z;
        if (plane.c!==0) {
            x = Math.floor(Math.random()*100);
            y = Math.floor(Math.random()*100);
            z = (0-plane.d-plane.a*x-plane.b*y)/plane.c;
        } else if (plane.b!==0) {
            x = Math.floor(Math.random()*100);
            z = Math.floor(Math.random()*100);
            y = (0-plane.d-plane.a*x-plane.c*z)/plane.b;
        } else if (plane.a!==0) {
            y = Math.floor(Math.random()*100);
            z = Math.floor(Math.random()*100);
            x = (0-plane.d-plane.b*y-plane.c*z)/plane.a;
        }
        return {x: x, y: y, z: z};
    }

    static findPlaneOfPoints(points) {
        let a = (points[1].y-points[0].y)*(points[2].z-points[0].z)-(points[2].y-points[0].y)*(points[1].z-points[0].z);
        let b = -(points[1].x-points[0].x)*(points[2].z-points[0].z)+(points[2].x-points[0].x)*(points[1].z-points[0].z);
        let c = (points[1].x-points[0].x)*(points[2].y-points[0].y)-(points[1].y-points[0].y)*(points[2].x-points[0].x);
        let d = -1*(points[0].x*a+points[0].y*b+points[0].z*c);
        return {a: a, b: b, c: c, d: d};
    }

    static ifPointsBelongToOneLine(points) {
        return (points[2].x - points[0].x) / (points[1].x - points[0].x) === (points[2].y - points[0].y) / (points[1].y - points[0].y) && (points[2].x - points[0].x) / (points[1].x - points[0].x) === (points[2].z - points[0].z) / (points[1].z - points[0].z);
    }

}
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = RotationPlane;
}