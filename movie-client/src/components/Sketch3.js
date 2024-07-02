import Drop from './Drop'


export default function Sketch3(p) {
    let drops = [];
    let dropNum = 500;
    p.setup = () => {
        p.createCanvas(400, 400);
        for (let i = 0; i < dropNum; i++) {
            drops.push(new Drop(p));
        }
    }

    p.draw = () => {
        p.background(230, 230, 250);
        for (let i = 0; i < dropNum; i++) {
            drops[i].fall();
            drops[i].show();
        }
    }

}