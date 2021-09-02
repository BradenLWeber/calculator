import '../styles/calcDisplay.css';
import * as constants from '../constants/constants.js';
import react, { useEffect, useState } from 'react';

const CalcScreen = (props) => {
  const { edgeRight, edgeLeft, edgeBottom, lines, cursorPos, currentLine } = props;
  const { CHARS_ON_SCREEN } = constants;

  const [numberArray, setArray] = useState([...Array(props.rowsOnScreen).keys()].reverse());
  useEffect(() => {setArray(array => [...Array(props.rowsOnScreen).keys()].slice(1).reverse())}, [props.rowsOnScreen]);

  function displayLine(rowNum) {
    const line = lines[getLineNumber(rowNum)];
    if (line === undefined) return;
    if (lines.length > rowNum) {
      if (line.length < CHARS_ON_SCREEN) return line;
      return line.slice(line.length - CHARS_ON_SCREEN);
    } else {
      return '';
    }
  }

  function putCursor() {
    const leftPos = 66.5 + 16.5 * (22 - edgeRight + cursorPos);
    const animate = currentLine === 0 ? 'blinker 1s step-start infinite' : 'none';
    const topPos = 52 + 34.4 * (props.rowsOnScreen - 1);
    return {
      left: leftPos + 'px',
      animation: animate,
      top: topPos + 'px',
    };
  }

  function getLineNumber(line) {
    return edgeBottom + line;
  }

  function haveRightArrow(line) {
    if (currentLine === getLineNumber(line)) return '\u00AB';
  }

  function haveLeftArrow(line) {
    if (line === 0 && currentLine === 0) {
      return edgeLeft !== 0 ? '<' : '';
    }
    if (lines.length > line + edgeBottom && lines[edgeBottom + line].length > CHARS_ON_SCREEN) {
      return '<';
    }
  }

  function getHeight(numberColumn = false) {
    return {
      height: props.rowsOnScreen * 35 + 3 + (-2 * numberColumn) + 'px'
    }
  }

  return (
    <div
      id='calc-screen'
      className='calc-screen'
      style={getHeight()}
    >
      <div
        id='calc-screen-arrow-column-left'
        className='calc-arrow-column-left'
        style = {getHeight()}
      >
        <div style={{height: '0.5px'}} />
        {numberArray.map(element => {
          return (
            <react.Fragment>
              {haveLeftArrow(element)}
              <br/>
            </react.Fragment>
          )
        })}
        {haveLeftArrow(0)}
      </div>

      <div
        id='calc-screen-number-column'
        className='calc-number-column'
        style={getHeight(true)}
      >
        {numberArray.map(element => {
          return (
            <react.Fragment>
              {displayLine(element)}
              <br />
            </react.Fragment>
          )
        })}
        {currentLine === 0
          ? lines[0].slice(edgeLeft, edgeRight)
          : displayLine(0)}
      </div>

      <div
        id='calc-screen-arrow-column-right'
        className='calc-arrow-column-right'
        style={getHeight()}
      >
        {numberArray.map(element => {
          return (
            <react.Fragment>
              {haveRightArrow(element)}
              <div style={{ height: '34.5px' }} />
            </react.Fragment>
          )
        })}
        {currentLine === 0
          ? edgeRight < lines[currentLine].length && '>'
          : haveRightArrow(0)
        }
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
