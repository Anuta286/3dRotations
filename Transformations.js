class Transformations {
    static rotateWithTrig(x, y) {
        const center = this.center;
        let oldCoord = {x: x - center.x, y: center.y - y};
        const angle = Math.PI / 36;
        let newX = center.x + oldCoord.x * Math.cos(angle) - oldCoord.y * Math.sin(angle);
        let newY = -(-center.y + oldCoord.x * Math.sin(angle) + oldCoord.y * Math.cos(angle));
        return {x: newX, y: newY};
    }
    static rotateWithComplexNumbers(x, y) {

    }
    static rotateWithMatrices(x, y) {

    }
}