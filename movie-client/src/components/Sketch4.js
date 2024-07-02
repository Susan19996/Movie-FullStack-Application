//Phyllotaxis
export default function Sketch4(p) {
    let n = 0;
    let c = 4;
    p.setup = () => {
        p.createCanvas(400,400);
        p.background(0);
        p.angleMode(p.DEGREES);
        p.colorMode(p.HSB);

    }

    p.draw = () => {
        let angel = n * 137.5;
        let radius = c * p.sqrt(n);

        let x = p.cos(angel) * radius;
        let y = p.sin(angel) * radius;

        p.noStroke();
        p.fill(n % 256, 255, 255);
        p.translate(p.width / 2, p.height / 2);
        p.ellipse(x, y , 5, 5);
        n++;
    }
}