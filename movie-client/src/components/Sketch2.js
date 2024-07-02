import Box from './Box';


export default function Sketch2(p) {
    let a = 0;
    let box;
    let boxes ;
    p.setup = () => {
        p.createCanvas(400, 400, p.WEBGL);
        //p.normalMaterial();
        box = new Box(p, 0, 0, 0, 90);
        boxes = box.generate();
    };

    p.draw = () => {
        p.background(51);
        p.stroke(255);
        p.noFill();
        //p.translate(p.width / 2, p.height / 2);
        p.rotateX(a);
        // p.rotateY(a * 0.02);
        // p.rotateZ(a * 0.06);

        for (let i = 0; i < boxes.length; i++) {
            boxes[i].show();
        }

        a += 0.01;

    }
}