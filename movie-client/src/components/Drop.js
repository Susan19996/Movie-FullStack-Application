export default function Drop(p) {
    this.x = p.random(0, p.width);
    this.y = p.random(-500, -50);
    this.z = p.random(0, 20);
    this.len = p.map(this.z, 0, 20, 5, 20);
    this.thick = p.map(this.z, 0, 20, 1, 3);
    this.ySpeed = p.map(this.z, 0, 20, 5, 10);
    this.gravity = p.map(this.z, 0, 20, 0.01, 0.04);

    this.fall = () => {
        this.y = this.y + this.ySpeed;
        this.ySpeed = this.ySpeed + this.gravity;
        if (this.y > p.height) {
            this.y = p.random(-500, -50);
            this.ySpeed = p.map(this.z, 0, 20, 5, 10);
        }
    };

    this.show = () => {
        p.strokeWeight(this.thick);
        p.stroke(138, 43, 226);
        p.line(this.x, this.y, this.x, this.y + this.len);
    };

}