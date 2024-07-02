import Star from './Star';

export default function sketch(p) {

    let stars = [];
    let speed;
    p.setup = function () {
        p.createCanvas(400, 400);
        for (let i = 0; i < 800; i++) {
            stars[i] = new Star(p);
        }
    }

    p.draw = function() {
        p.background(0);
        p.noStroke();
        p.translate(p.width / 2, p.height / 2);
        speed = p.map(p.mouseX, 0, p.width, 0, 20);
        for(let i = 0; i < stars.length; i++) {
            stars[i].update(speed);
            stars[i].show();
        }
    };
};