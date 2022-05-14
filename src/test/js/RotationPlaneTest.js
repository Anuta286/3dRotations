const RotationPlane = require('../../../RotationPlane');
const Vector = require('../../../Vector');
const assert = require('assert');

describe('RotationPlane', ()=> {

    it('rotates a plane', () => {
        let plane = {a: 0, b: 0, c: 1, d: 1};
        let eye = new Vector([0, 0, 0]);
        let leftRight = 20;
        let newPlane = RotationPlane.rotatePlane(eye, plane, leftRight);
        assert.equal(Math.floor(newPlane.a/10)*10, 0);
        assert.equal(Math.floor(newPlane.b/10)*10, 0);
        assert.equal(Math.floor(newPlane.c/10)*10, Math.floor(newPlane.d/10)*10);
    });

    it('finds points on plane', () => {
        let plane = {a: 0, b: 0, c: 1, d: 1};
        let points = RotationPlane.findPointsOnPlane(plane);
        for (let i=0; i<points.length; i++) {
            assert.strictEqual(plane.a*points[i].x+plane.b*points[i].y+plane.c*points[i].z+plane.d, 0);
        }
    });

    it('returns true if points belong to the same line', () => {
        let points = [{x: 1, y: 1, z: 1}, {x: 2, y: 2, z: 2},  {x: -1, y: -1, z: -1}];
        for (let i=0; i<points.length; i++) {
            assert.strictEqual(RotationPlane.ifPointsBelongToOneLine(points), true);
        }
    });

    it('returns true if points belong to the same line 2', () => {
        let points = [{x: 1, y: 1, z: 1}, {x: 5, y: 2, z: 2},  {x: -1, y: -1, z: -1}];
        for (let i=0; i<points.length; i++) {
            assert.strictEqual(!RotationPlane.ifPointsBelongToOneLine(points), true);
        }
    });

    it('finds plane from 3 points', () => {
        let points = [{x: 1, y: 1, z: 1}, {x: 5, y: 2, z: 2},  {x: -1, y: -1, z: -1}];
        let plane = RotationPlane.findPlaneOfPoints(points);
        assert.strictEqual(plane.a, 0);
        assert.strictEqual(plane.b, 6);
        assert.strictEqual(plane.c, -6);
        assert.equal(plane.d, 0);
    });

});