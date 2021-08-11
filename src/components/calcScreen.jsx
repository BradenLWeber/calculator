import '../styles/calcDisplay.css';
import * as constants from '../constants/constants.js';

const CalcScreen = (props) => {
  const { edgeRight, edgeLeft, edgeBottom, lines, cursorPos, currentLine } = props;
  const { CHARS_ON_SCREEN } = constants;

  function displayLine(rowNum) {
    const line = lines[getLineNumber(rowNum)];
    if (lines.length > rowNum) {
      if (line.length < CHARS_ON_SCREEN) return line;
      return line.slice(line.length - CHARS_ON_SCREEN);
    } else {
      return '';
    }
  }

  function putCursor() {
    const pos = 66.5 + 16.5 * (22 - edgeRight + cursorPos);
    const animate = currentLine === 0 ? 'blinker 1s step-start infinite' : 'none';
    return {
      left: pos + 'px',
      animation: animate,
    };
  }

  function getLineNumber(line) {
    return edgeBottom + line;
  }

  function haveRightArrow(line) {
    if (currentLine === getLineNumber(line)) return '\u00AB';
  }

  function haveLeftArrow(line) {
    if (line === 0) {
      if (
        currentLine === 0 &&
        lines[0].length > CHARS_ON_SCREEN &&
        edgeLeft !== 0
      )
        return '<';
    } else {
      if (
        lines.length >= line + 1 &&
        lines[edgeBottom + line].length > CHARS_ON_SCREEN
      )
        return '<';
    }
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
        {haveLeftArrow(3)}
        <br />
        {haveLeftArrow(2)}
        <br />
        {haveLeftArrow(1)}
        <br />
        {haveLeftArrow(0)}
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
        {haveRightArrow(3)}
        <div style={{ height: '34px' }} />
        {haveRightArrow(2)}
        <div style={{ height: '34px' }} />
        {haveRightArrow(1)}
        <div style={{ height: '34px' }} />
        {currentLine === 0
          ? edgeRight < lines[currentLine].length && '>'
          : haveRightArrow(0)}
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
