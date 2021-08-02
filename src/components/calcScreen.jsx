import '../styles/calcDisplay.css';
import * as constants from '../constants/constants.js';

const CalcScreen = (props) => {

    const { edgeRight, edgeLeft, lines, cursorPos, currentLine } = props;
    const { CHARS_ON_SCREEN } = constants;

    function displayLine(line) {
        if (line.length < CHARS_ON_SCREEN) return line;
        return line.slice(line.length - CHARS_ON_SCREEN);
    };

    function putCursor() {
        let pos = 16.5 * (22 - edgeRight + cursorPos);
        return {
            left : pos + 'px',
            top : '131px'
        }
    };

    function getLineNumber(line) {
        if (lines.length <= 4) {
            return line;
        } else if (currentLine <= lines.length - 4) {
            return currentLine + line;
        } else {
            if (line === 0) return lines.length - 4;
            if (line === 1) return lines.length - 3;
            if (line === 2) return lines.length - 2;
            if (line === 3) return lines.length - 1;
        }
    }

    return (
        <div id='calc-screen' className='calc-screen' style={{ fontFamily: 'Consolas' }}>
            <div id='calc-screen-arrow-column-left' className='calc-arrow-column-left'>
                {lines.length >= 4 && lines[3].length >= CHARS_ON_SCREEN && '<'}< br />
                {lines.length >= 3 && lines[2].length >= CHARS_ON_SCREEN && '<'}< br />
                {lines.length >= 2 && lines[1].length >= CHARS_ON_SCREEN && '<'}< br />
                {edgeLeft > 0 && '<'}
            </div>
            <div id='calc-screen-number-column' className = 'calc-number-column'>
                {lines.length >= 4 && displayLine(lines[getLineNumber(3)])}
                <br />
                {lines.length >= 3 && displayLine(lines[getLineNumber(2)])}
                <br />
                {lines.length >= 2 && displayLine(lines[getLineNumber(1)])}
                <br />
                {currentLine === 0 ?
                    lines[0].slice(edgeLeft, edgeRight)
                    : displayLine(lines[getLineNumber(0)])
                }
            </div>
            <div id='calc-screen-arrow-column-right' className='calc-arrow-column-right'>
                < br />< br />< br />{edgeRight < lines[currentLine].length && '>'}
            </div>
            <div id='calc-screen-cursor-display' className='calc-cursor' style = {putCursor()}>
                {currentLine === 0 && '|'}
            </div>
        </div>
    );
  }

  export default CalcScreen;