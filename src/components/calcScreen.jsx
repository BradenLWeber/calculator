import '../styles/calcDisplay.css';
import * as constants from '../constants/constants.js';

const CalcScreen = (props) => {
  const { edgeRight, edgeLeft, edgeBottom, lines, cursorPos, currentLine } = props;
  const { CHARS_ON_SCREEN } = constants;

  function displayLine(rowNum) {
    const line = lines[getLineNumber(rowNum)];
    console.log('line', line, 'rowNum', rowNum, 'getLine', getLineNumber(rowNum));
    if (lines.length > rowNum) {
        if (line.length < CHARS_ON_SCREEN) return line;
        return line.slice(line.length - CHARS_ON_SCREEN);
    } else {
        return ''
    }
  }

  function putCursor() {
    let pos = 16.5 * (22 - edgeRight + cursorPos);
    return {
      left : pos + 'px',
      top : '131px',
    };
  }

  function getLineNumber(line) {
      return edgeBottom + line;
  }

  function haveArrow(line) {
      if (currentLine === getLineNumber(line)) return '\u2770'
  }

  return (
    <div
      id='calc-screen'
      className='calc-screen'
      style={{ fontFamily: 'Consolas' }}
    >
      <div
        id='calc-screen-arrow-column-left'
        className='calc-arrow-column-left'
      >
        {lines.length >= 4 && lines[3].length >= CHARS_ON_SCREEN && '<'}
        <br />
        {lines.length >= 3 && lines[2].length >= CHARS_ON_SCREEN && '<'}
        <br />
        {lines.length >= 2 && lines[1].length >= CHARS_ON_SCREEN && '<'}
        <br />
        {edgeLeft > 0 && '<'}
      </div>
      <div id='calc-screen-number-column' className='calc-number-column'>
        {displayLine(3)}
        <br />
        {displayLine(2)}
        <br />
        {displayLine(1)}
        <br />
        {currentLine === 0
          ? lines[0].slice(edgeLeft, edgeRight)
          : displayLine(0)}
      </div>
      <div
        id='calc-screen-arrow-column-right'
        className='calc-arrow-column-right'
      >
        {haveArrow(3)}<br />
        {haveArrow(2)}<br />
        {haveArrow(1)}<br />
        {currentLine === 0 ? edgeRight < lines[currentLine].length && '>' : haveArrow(0)}
      </div>
      <div
        id='calc-screen-cursor-display'
        className='calc-cursor'
        style={putCursor()}
      >
        {edgeBottom === 0 && '|'}
      </div>
    </div>
  );
};

export default CalcScreen;
