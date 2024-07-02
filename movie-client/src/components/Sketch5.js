export default function Sketch5(p) {
    let angle = 0;
    let radius = 10;
    let x;
    let y;
    p.setup = () => {
        p.createCanvas(400, 400);
        p.background(0);
        p.colorMode(p.HSB);
        p.angleMode(p.DEGREES);

    }

    p.draw = () => {
        p.noStroke();
        p.fill(0, 255, 255);
        p.translate(p.width / 2, p.height / 2);
        x = 16 * p.pow(p.sin(angle), 3) * radius;
        y =
            -radius * (13 * p.cos(angle) - 5 * p.cos(2 * angle) - 3 * p.cos(3 * angle) - p.cos(4
                                                                                               * angle));
        p.ellipse(x, y, 3, 3);
        angle += 0.5;
        if (angle >= 360) {
            p.noLoop();
        }
    }
}