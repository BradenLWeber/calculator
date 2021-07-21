import React, { Component } from "react";
import CalcButtons from "./calcButtons";
import CalcScreen from './calcScreen';
import './calcdisplay.css';

class Calculator extends Component {
  state = {
    reset: 0,
    cursorPos: 0,
    edgeRight: 0,
    edgeLeft: 0,
    displayedLines: ['', '', '', ''],
    mathLines: ['', '', '', ''],
    buttons: [
                            // delete
      ['x!', 'ln', '(', ')', '\u232B', 'AC'],
      // sqrt       x^n                       /
      ['\u221A', 'x\u207F', '7', '8', '9', '\u00F7'],
      //  up
      ['\u2191', '4', '5', '6', '*'],
      // left      right
      ['\u2190', '\u2192', '1', '2', '3', '-'],
      // down
      ['\u2193', '0', '.', '=', '+'],
    ],
  };

  equalsButtonState = () => {
    return {
      cursorPos: 0,
      edgeRight: 0,
      edgeLeft: 0,
      displayedLines: ['', String(eval(this.state.displayedLines[0]))].concat(this.state.displayedLines)
    }
  };

  acButtonState = () => {
    return {
      cursorPos: 0,
      edgeRight: 0,
      edgeLeft: 0,
      displayedLines: [''].concat(this.state.displayedLines.slice(1))
    }
  };

  deleteButtonState = () => {
    if (this.state.cursorPos === 0) {
      return {}
    }
    let newDisplayedLines = this.state.displayedLines;
    newDisplayedLines[0] = newDisplayedLines[0].slice(0, this.state.cursorPos-1).concat(newDisplayedLines[0].slice(this.state.cursorPos))
    return {
      displayedLines: newDisplayedLines
    }
  };

  moveCursor = (direction) => {
    const { cursorPos } = this.state;

    if (direction === 'right') {
      if (cursorPos === this.state.displayedLines[0].length)
        return console.log("skipping moving right, edge right - " + this.state.edgeRight + ' edge left - ' + this.state.edgeLeft);
      if (cursorPos === this.state.edgeRight)
        this.setState({edgeRight : this.state.edgeRight + 1, edgeLeft : this.state.edgeLeft + 1})
      this.setState({cursorPos: cursorPos + 1});
      return;
    }

    if (direction === 'left') {
      if (cursorPos <= 0)
        return console.log("skipping moving left, edge right - " + this.state.edgeRight + ' edge left - ' + this.state.edgeLeft);
      if (cursorPos === this.state.edgeLeft)
        this.setState({edgeRight : this.state.edgeRight - 1, edgeLeft : this.state.edgeLeft - 1});
      this.setState({cursorPos: cursorPos - 1});
      return;
    }

    console.log('unknown direction given to move cursor: ' + direction);
  };

  onClick = (theButton) => {
    const { symbol } = theButton.state;
    const { cursorPos } = this.state;

    if (this.addSymbol(symbol, cursorPos) === 'specialChar') return;

    // Passing in a function eliminates race conditions
    this.setState( currentState => {
      currentState.cursorPos = currentState.cursorPos + 1;
      currentState.edgeRight = currentState.edgeRight + 1;
      return currentState;
    });

    if (this.state.edgeRight > 20)
      this.setState(currentState => {
        currentState.edgeLeft = currentState.edgeRight - 20
        return currentState;
      });
  };

  addSymbol = (symbol, cursorPos) => {
    if (symbol === "=") {
      this.setState( this.equalsButtonState() );
      return 'specialChar';
    }
    if (symbol === "\u2190") {
      this.moveCursor('left');
      return 'specialChar';
    }
    if (symbol === "\u2192") {
      this.moveCursor('right');
      return 'specialChar';
    }
    if (symbol === 'AC') {
      this.setState( this.acButtonState() );
      return 'specialChar';
    }
    if (symbol === "\u232B") {
      this.setState( this.deleteButtonState() );
      this.setState( {edgeRight : this.state.edgeRight - 1});
      return 'specialChar';
    }

    if (symbol === 'x!') {
      symbol = '!';
    }
    if (symbol === 'ln') {
      symbol = 'ln()';
      this.setState(currentState => {
        console.log('currentState.edgeRight', currentState.edgeRight, 'currentState.edgeLeft', currentState.edgeLeft);
        currentState.edgeLeft = currentState.edgeRight < 18 ? 0 : currentState.edgeRight - 17;
        currentState.edgeRight = currentState.edgeRight + 3;
        currentState.cursorPos = currentState.cursorPos + 2;
        return currentState;
      });
    }
    if (symbol === "x\u207F") {
      symbol = '^()';
      this.setState(currentState => {
        currentState.edgeRight = currentState.edgeRight + 2;
        currentState.cursorPos = currentState.cursorPos + 1;
        return currentState;
      });
    }
    if ( symbol === "\u221A" ) {
      symbol = "\u221A()"
      this.setState(currentState => {
        currentState.edgeRight = currentState.edgeRight + 2;
        currentState.cursorPos = currentState.cursorPos + 1;
        return currentState;
      });
    }

    const displayedLines = this.state.displayedLines;
    displayedLines[0] = displayedLines[0]
      .slice(0, cursorPos)
      .concat(symbol)
      .concat(displayedLines[0].slice(cursorPos));

    console.log('After adding symbol, edgeRight:', this.state.edgeRight, 'edgeLeft:', this.state.edgeLeft);
  }

  render() {
    console.log('-------------------');
    console.log("displayedLines during render: ", this.state.displayedLines);
    console.log("Display index range: " + this.state.edgeLeft + " - " + this.state.edgeRight);
    console.log("CursorPos:", this.state.cursorPos);

    return (
      <React.Fragment>
        <div id='calculator-body' className="flex calc-body">
          <div className="flex-body">
            <br />
            <CalcScreen
              lines = {this.state.displayedLines}
              edgeRight = {this.state.edgeRight}
              edgeLeft = {this.state.edgeLeft}
              cursorPos = {this.state.cursorPos}
            />
            <br />
            <CalcButtons buttons = {this.state.buttons} click = {this.onClick} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Calculator;
