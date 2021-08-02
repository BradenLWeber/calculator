import React, { Component } from 'react';
import CalcButtons from './calcButtons';
import CalcScreen from './calcScreen';
import '../styles/calcDisplay.css';
import * as constants from '../constants/constants';

class Calculator extends Component {
  state = {
    cursorPos: 0,
    edgeRight: 0,
    edgeLeft: 0,
    currentLine: 0,
    displayedLines: [''],
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

// ----- level zero --------

  equalsButton = () => {
    this.setState({
      cursorPos: 0,
      edgeRight: 0,
      edgeLeft: 0,
      displayedLines: ['', String(eval(this.state.displayedLines[0]))].concat(this.state.displayedLines)
    });
  };

  acButton = () => {
    this.setState({
      cursorPos: 0,
      edgeRight: 0,
      edgeLeft: 0,
      displayedLines: [''].concat(this.state.displayedLines.slice(1))
    });
  };

  deleteButton = () => {
    const { cursorPos } = this.state;
    if (cursorPos === 0) {
      return {}
    }

    let newDisplayedLines = this.state.displayedLines;
    let firstCut = cursorPos-1;
    let secondCut = cursorPos;

    if (newDisplayedLines[0][cursorPos-1] === 'l') secondCut++;
    else if (newDisplayedLines[0][cursorPos-1] === 'n') firstCut--;
    newDisplayedLines[0] = newDisplayedLines[0].slice(0, firstCut).concat(newDisplayedLines[0].slice(secondCut))

    this.setState ({
      displayedLines: newDisplayedLines,
      cursorPos: cursorPos - 1,
      edgeRight : this.state.edgeRight - 1
    });
  };

  moveCursor = (direction) => {
    const { cursorPos, displayedLines } = this.state;

    if (direction === 'right') {
      // Skip moving if cursor is as far right as it can go
      if (cursorPos === displayedLines[this.state.currentLine].length)
        return console.log('skipping moving right, edge right - ' + this.state.edgeRight + ' edge left - ' + this.state.edgeLeft);

      // Move an extra spot if it is moving through "ln"
      if (displayedLines[this.state.currentLine][cursorPos] === 'l') {
        // Move the screen right once if the full "ln" isn't on screen
        if (cursorPos === this.state.edgeRight - 1 || cursorPos === this.state.edgeRight) {
          this.setState(currentState => {
            return {edgeRight : currentState.edgeRight + 1, edgeLeft : currentState.edgeLeft + 1}})
        }
        // Always move the cursor an extra position because of the ln
        this.setState(currentState => {
          return { cursorPos : currentState.cursorPos + 1 };
        })
      }

      // Move the whole screen one step right if it is on the right edge
      if (cursorPos === this.state.edgeRight)
        this.setState(currentState => {
          currentState.edgeRight = currentState.edgeRight + 1;
          currentState.edgeLeft = currentState.edgeLeft + 1;
          return currentState;
        })

      // Always move the cursor forward one
      this.setState(currentState => {
        return { cursorPos : currentState.cursorPos + 1 };
      });
    }

    if (direction === 'left') {
      // Skip moving if cursor is as far left as it can go
      if (cursorPos === 0)
        return console.log('skipping moving left, edge right - ' + this.state.edgeRight + ' edge left - ' + this.state.edgeLeft);

      // Move an extra spot if it is moving through "ln"
      if (displayedLines[this.state.currentLine][cursorPos-1] === 'n') {
        // Move the screen left once if the full "ln" isn't on screen
        if (cursorPos === this.state.edgeLeft + 1 || cursorPos === this.state.edgeLeft) {
          this.setState(currentState => {
            return {edgeRight : currentState.edgeRight - 1, edgeLeft : currentState.edgeLeft - 1}})
        }
        // Always move the cursor an extra position because of the ln
        this.setState(currentState => {
          return { cursorPos : currentState.cursorPos - 1 };
        })
      }

      // Move the whole screen one step left if it is on the extendable left edge
      if (cursorPos === this.state.edgeLeft)
        this.setState(currentState => {
          currentState.edgeRight = currentState.edgeRight - 1;
          currentState.edgeLeft = currentState.edgeLeft - 1;
          return currentState;
        })

      // Always move the cursor backward one
      this.setState(currentState => {
        return { cursorPos : currentState.cursorPos - 1 };
      });
    }

    else { console.log('unknown direction given to move cursor: ' + direction); }
  };

  moveLines = (direction) => {
    if (direction === 'up') {
      if (this.state.currentLine < this.state.displayedLines.length - 7) {

        this.setState(currentState => {
          return { currentLine : currentState.currentLine + 1 }
        })
      }
    }

    else if (direction === 'down') {
      if (this.state.currentLine > 0) {
        this.setState(currentState => {
          return { currentLine : currentState.currentLine - 1 }
        })
      }
    }

    else { console.log('unknown direction given to move lines:', direction); }
  }

// ------- level one --------

  specialButton = (symbol) => {
    if (symbol === '=')           this.equalsButton();
    else if (symbol === '\u2190') this.moveCursor('left');
    else if (symbol === '\u2192') this.moveCursor('right');
    else if (symbol === 'AC')     this.acButton();
    else if (symbol === '\u232B') this.deleteButton();
    else if (symbol === '\u2191') this.moveLines('up');
    else if (symbol === '\u2193') this.moveLines('down');
  }

  specialChar = (symbol) => {
    if (symbol === 'x!') {
      return '!';
    }
    if (symbol === 'ln') {
      this.setState(currentState => {
        currentState.edgeRight = currentState.edgeRight + 3;
        currentState.cursorPos = currentState.cursorPos + 2;
        // Correct edgeRight and edgeLeft if ln is being added 3 characters or less from the left side of the screen
        if (currentState.edgeRight > constants.CHARS_ON_SCREEN - 4 && currentState.cursorPos <= currentState.edgeLeft + 5) {
          currentState.edgeRight -= 6 - (currentState.cursorPos - currentState.edgeLeft);
          currentState.edgeLeft = currentState.edgeRight - constants.CHARS_ON_SCREEN;
        }
        return currentState;
      });
      return 'ln()';
    }
    if (symbol === 'x\u207F') {
      this.setState(currentState => {
        currentState.edgeRight = currentState.edgeRight + 2;
        currentState.cursorPos = currentState.cursorPos + 1;
        return currentState;
      });
      return '^()';
    }
    if ( symbol === '\u221A' ) {
      this.setState(currentState => {
        currentState.edgeRight = currentState.edgeRight + 2;
        currentState.cursorPos = currentState.cursorPos + 1;
        return currentState;
      });
      return '\u221A()';
    }
  }

// ------- level two ---------

  addSymbol = (symbol, cursorPos) => {
    //                                 left                   right
    if (symbol === '=' || symbol === '\u2190' || symbol === '\u2192' || symbol === 'AC' ||
    //               delete                  up                    down
        symbol === '\u232B' || symbol === '\u2191' || symbol === '\u2193') {
      this.specialButton( symbol );
      return 'specialButton';
    }

    //                                                      x^n                   sqrt()
    if (symbol === 'x!' || symbol === 'ln' || symbol === 'x\u207F' || symbol === '\u221A') {
      symbol = this.specialChar( symbol );
    }

    const displayedLines = this.state.displayedLines;
    displayedLines[0] = displayedLines[0]
      .slice(0, cursorPos)
      .concat(symbol)
      .concat(displayedLines[0].slice(cursorPos));

    console.log('After adding symbol, edgeRight:', this.state.edgeRight, 'edgeLeft:', this.state.edgeLeft);
  };

// ------- level three ---------

  onClick = (theButton) => {
    const { symbol } = theButton.state;
    const { cursorPos } = this.state;

    if (this.addSymbol(symbol, cursorPos) === 'specialButton') return;

    // Passing in a function eliminates race conditions
    this.setState( currentState => {
      currentState.cursorPos++;
      currentState.edgeRight++;
      if (currentState.edgeRight >= constants.CHARS_ON_SCREEN) {
        currentState.edgeLeft = currentState.edgeRight - constants.CHARS_ON_SCREEN;
      }
      return currentState;
    });
  };

  render() {
    console.log('-------------------');
    console.log('displayedLines during render: ', this.state.displayedLines);
    console.log('Display index range: ' + this.state.edgeLeft + ' - ' + this.state.edgeRight);
    console.log('CursorPos:', this.state.cursorPos);

    return (
      <div id='calculator-body' className='calc-body'>
        <br />
        <CalcScreen
          lines = {this.state.displayedLines}
          edgeRight = {this.state.edgeRight}
          edgeLeft = {this.state.edgeLeft}
          cursorPos = {this.state.cursorPos}
          currentLine = {this.state.currentLine}
        />
        <div style={ {height : '22px' } }/>
        <CalcButtons buttons = {this.state.buttons} click = {this.onClick} />
      </div>
    );
  }
}

export default Calculator;
