import '../styles/calcDisplay.css';
import * as constants from '../constants/constants.js';

const CalcScreen = (props) => {

    const { edgeRight, edgeLeft, lines, cursorPos } = props;
    const { CHARS_ON_SCREEN } = constants;

    function displayLine(line) {
        if (line.length < CHARS_ON_SCREEN) return line;
        return line.slice(line.length - CHARS_ON_SCREEN);
    };

    function putCursor() {
        let pos = 4 + 16.5 * (22 - edgeRight + cursorPos);
        return {
            left : pos + 'px',
            top : '131px'
        }
    };

    return (
        <div id='calc-screen' className='calc-screen' style={{ fontFamily: 'Consolas' }}>
            <div id='calc-screen-arrow-column-left' className='calc-arrow-column-left'>
                {lines[3].length >= CHARS_ON_SCREEN && '<'}< br />
                {lines[2].length >= CHARS_ON_SCREEN && '<'}< br />
                {lines[1].length >= CHARS_ON_SCREEN && '<'}< br />
                {edgeLeft > 0 && '<'}
            </div>
            <div id='calc-screen-number-column' className = 'calc-number-column'>
                {displayLine(lines[3])}
                <br />
                {displayLine(lines[2])}
                <br />
                {displayLine(lines[1])}
                <br />
                {lines[0].slice(edgeLeft, edgeRight)}
            </div>
            <div id='calc-screen-arrow-column-right' className='calc-arrow-column-right'>
                < br />< br />< br />{edgeRight < lines[0].length && '>'}
            </div>
            <div id='calc-screen-cursor-display' className='calc-cursor' style = {putCursor()}>
                |
            </div>
        </div>
    );
  }

  export default CalcScreen;