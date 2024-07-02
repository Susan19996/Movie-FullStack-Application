export default function Star(p) {
    this.x = p.random(-p.width, p.width);
    this.y = p.random(-p.width, p.height);
    this.z = p.random(0, p.width);

    this.update = (speed) => {
        this.z = this.z - speed;

        if (this.z < 1) {
            this.x = p.random(-p.width, p.width);
            this.y = p.random(-p.width, p.height);
            this.z = p.width;
        }

    }

    this.show = () => {
        let sx = p.map(this.x / this.z, 0, 1, 0, p.width);
        let sy = p.map(this.y / this.z, 0, 1, 0, p.height);
        let r = p.map(this.z, 0, p.width, 20, 0);

        p.ellipse(sx, sy, r, r);

    }

}