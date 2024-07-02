import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './sketch';
import sketch2 from './Sketch2';
import sketch3 from './Sketch3';
import sketch4 from './Sketch4';
import sketch5 from './Sketch5';

class Canvas extends React.Component {
    render() {
        return <div className="d-flex">
            {/*<P5Wrapper sketch={sketch}/>*/}
            {/*<P5Wrapper sketch={sketch2}/>*/}
            {/*<P5Wrapper sketch={sketch3}/>*/}
                <P5Wrapper sketch={sketch5}/>
               </div>
    }

}

export default Canvas;
