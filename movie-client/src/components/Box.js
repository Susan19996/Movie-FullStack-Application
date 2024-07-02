
export default function Box(p, x, y, z, r) {
    this.pos = p.createVector(x, y, z);
    this.r = r;

    this.generate = () => {
        let boxes = [];
        let newR = this.r / 3;
        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                for (let z = -1; z < 2; z++) {
                    let newBox = new Box(p, this.pos.x + x * newR, this.pos.y + y * newR, this.pos.z + z * newR, newR);
                    boxes.push(newBox);
                }
            }
        }
        return boxes;
    }

    this.show = () => {
        p.push();
        p.translate(this.pos.x, this.pos.y, this.pos.z);
        p.box(this.r);
        p.pop();
    }

}