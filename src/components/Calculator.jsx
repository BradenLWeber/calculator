import React, { Component } from 'react';
import CalcButtons from './calcButtons';
import CalcScreen from './calcScreen';
import '../styles/calcDisplay.css';
import { CHARS_ON_SCREEN, CHAR_SIZE, MAX_LINE_LENGTH } from '../constants/constants';
import { evaluate } from 'mathjs';

class Calculator extends Component {
  state = {
    cursorPos: 0,
    edgeRight: 0,
    edgeLeft: 0,
    edgeTop: 0,
    edgeBottom: 0,
    currentLine: 0,
    rowsOnScreen: 4,
    displayedLines: [''],
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

  evaluateUserExpression = () => {
    let userLine = this.state.displayedLines[0];
    userLine = userLine.replace(/ln/g, 'log');
    userLine = userLine.replace(/\u221A/g, 'sqrt');
    userLine = userLine.replace(/\u00F7/g, '/');
    try {
      const answer = String(evaluate(userLine));
      if (answer === 'NaN') throw Error;
      return answer;
    } catch {
      return 'Error';
    }
  };

  handleKeyPress = (event) => {
    if ('0123456789.+-*!=()'.includes(event.key)) {
      this.clicked(event.key);
    } else if (event.key === '/') {
      this.clicked('\u00F7');
    } else if (event.key.toLowerCase() === 'l') {
      this.clicked('ln');
    } else if (event.key === '^') {
      this.clicked('x\u207F');
    } else if (event.key.toLowerCase() === 's') {
      this.clicked('\u221A');
    } else if (event.key.toLowerCase() === 'a') {
      this.clicked('AC');
    } else if (event.key.toLowerCase() === 'd'){
      this.editNumberOfRows('add');
    } else if (event.key.toLowerCase() === 'u') {
      this.editNumberOfRows('delete');
    } else if (
      event.key.toLowerCase() === 'c' &&
      this.state.buttons[4][3] === 'copy'
    ) {
      this.clicked('copy');
    }
  };

  handleKeyPressOther = (event) => {
    if (event.keyCode === 8) this.clicked('\u232B');
    else if (event.keyCode === 37) this.clicked('\u2190');
    else if (event.keyCode === 38) this.clicked('\u2191');
    else if (event.keyCode === 39) this.clicked('\u2192');
    else if (event.keyCode === 40) this.clicked('\u2193');
  };

  equalsButton = () => {
    const evaluatedLine = this.evaluateUserExpression();
    const lines = this.state.edgeTop + 2

    this.setState({
      cursorPos: 0,
      edgeRight: 0,
      edgeLeft: 0,
      edgeTop: lines < this.state.rowsOnScreen ? lines : this.state.rowsOnScreen,
      displayedLines: ['', evaluatedLine].concat(this.state.displayedLines),
    });
  };

  acButton = () => {
    this.setState({
      cursorPos: 0,
      edgeRight: 0,
      edgeLeft: 0,
      displayedLines: [''].concat(this.state.displayedLines.slice(1)),
    });
  };

  deleteButton = () => {
    const { cursorPos } = this.state;
    if (cursorPos === 0) {
      return {};
    }

    let newDisplayedLines = this.state.displayedLines;
    let firstCut = cursorPos - 1;
    let secondCut = cursorPos;

    const charBeingDeleted = newDisplayedLines[0][cursorPos - 1];

    if (charBeingDeleted === '(') {
      const charBeforeDeleted = newDisplayedLines[0][cursorPos - 2];
      if (charBeforeDeleted === 'n') firstCut -= 2;
      else if (charBeforeDeleted === '\u221A') firstCut--;
      if (newDisplayedLines[0][cursorPos] === ')') secondCut++;
    } else if (charBeingDeleted === 'n') firstCut--;

    newDisplayedLines[0] = newDisplayedLines[0]
      .slice(0, firstCut)
      .concat(newDisplayedLines[0].slice(secondCut));

    let newEdgeRight = this.state.edgeRight + firstCut - secondCut;
    let newEdgeLeft = newEdgeRight - CHARS_ON_SCREEN;
    if (newEdgeLeft < 0) {
      if (newDisplayedLines[0].length >= CHARS_ON_SCREEN) {
        newEdgeRight = CHARS_ON_SCREEN;
      } else {
        newEdgeRight = newDisplayedLines[0].length;
      }
      newEdgeLeft = 0;
    }

    this.setState((currentState) => {
      return {
        displayedLines: newDisplayedLines,
        cursorPos: firstCut,
        edgeRight: newEdgeRight,
        edgeLeft: newEdgeLeft,
      };
    });
  };

  moveCursor = (direction) => {
    const { cursorPos, displayedLines, edgeRight, edgeLeft, currentLine } = this.state;

    if (direction === 'right') {
      if (cursorPos === displayedLines[currentLine].length) return;
      if (displayedLines[currentLine][cursorPos] === 'l') {
        if (cursorPos === edgeRight - 1 || cursorPos === edgeRight) {
          this.setState((currentState) => {
            return {
              edgeRight: currentState.edgeRight + 1,
              edgeLeft: currentState.edgeLeft + 1,
            };
          });
        }
        this.setState((currentState) => {
          return { cursorPos: currentState.cursorPos + 1 };
        });
      }

      if (cursorPos === edgeRight)
        this.setState((currentState) => {
          currentState.edgeRight = currentState.edgeRight + 1;
          currentState.edgeLeft = currentState.edgeLeft + 1;
          return currentState;
        });

      this.setState((currentState) => {
        return { cursorPos: currentState.cursorPos + 1 };
      });
    }

    if (direction === 'left') {
      if (cursorPos === 0) return;
      if (displayedLines[currentLine][cursorPos - 1] === 'n') {
        if (cursorPos === edgeLeft + 1 || cursorPos === edgeLeft) {
          this.setState((currentState) => {
            return {
              edgeRight: currentState.edgeRight - 1,
              edgeLeft: currentState.edgeLeft - 1,
            };
          });
        }
        this.setState((currentState) => {
          return { cursorPos: currentState.cursorPos - 1 };
        });
      }

      if (cursorPos === edgeLeft)
        this.setState((currentState) => {
          currentState.edgeRight = currentState.edgeRight - 1;
          currentState.edgeLeft = currentState.edgeLeft - 1;
          return currentState;
        });

      this.setState((currentState) => {
        return { cursorPos: currentState.cursorPos - 1 };
      });
    }
  };

  moveLines = (direction) => {
    const { currentLine } = this.state;

    if (direction === 'up') {
      if (currentLine < this.state.displayedLines.length - 1) {
        this.setState((currentState) => {
          // If currentLine pushes off the screen, move the screen up
          if (
            currentState.edgeTop === currentState.currentLine + 1 &&
            currentState.edgeTop !== currentState.displayedLines.length &&
            currentState.displayedLines.length > this.state.rowsOnScreen
          ) {
            currentState.edgeTop = currentState.edgeTop + 1;
            currentState.edgeBottom = currentState.edgeBottom + 1;
          }
          // If moving from the bottom line, change '=' to 'copy'
          if (currentState.currentLine === 0)
            currentState.buttons[4][3] = 'copy';
          return {
            currentLine: currentState.currentLine + 1,
            edgeTop: currentState.edgeTop,
            edgeBottom: currentState.edgeBottom,
          };
        });
      }
    } else if (direction === 'down') {
      if (currentLine > 0) {
        this.setState((currentState) => {
          // If currentLine pushes off the screen, move the screen down
          if (
            currentState.edgeBottom === currentState.currentLine &&
            currentState.edgeBottom !== 0
          ) {
            currentState.edgeTop = currentState.edgeTop - 1;
            currentState.edgeBottom = currentState.edgeBottom - 1;
          }
          // If moving from the bottom line, change 'copy' to '='
          if (currentState.currentLine === 1) currentState.buttons[4][3] = '=';
          return {
            currentLine: currentState.currentLine - 1,
            edgeTop: currentState.edgeTop,
            edgeBottom: currentState.edgeBottom,
          };
        });
      }
    }

    if (currentLine !== 0 && this.state.buttons[4][3] === '=') {
      this.setState((currentState) => {
        currentState.buttons[4][3] = 'copy';
        return { buttons: currentState.buttons };
      });
    } else if (currentLine === 0 && this.state.buttons[4][3] === 'copy') {
      this.setState((currentState) => {
        currentState.buttons[4][3] = '=';
        return { buttons: currentState.buttons };
      });
    }
  };

  copyButton = () => {
    const { displayedLines, currentLine } = this.state;
    if (
      displayedLines[currentLine] === 'Error' ||
      displayedLines[currentLine] === 'Infinity'
    )
      return;

    if (displayedLines[currentLine].length + displayedLines[0].length > MAX_LINE_LENGTH) {
      alert('Copying this line creates too long of a line');
      return;
    }

    this.setState((currentState) => {
      currentState.displayedLines[0] = currentState.displayedLines[0]
        .slice(0, currentState.cursorPos)
        .concat(currentState.displayedLines[currentState.currentLine])
        .concat(currentState.displayedLines[0].slice(currentState.cursorPos));

      currentState.edgeRight += currentState.displayedLines[currentState.currentLine].length;
      currentState.edgeLeft = currentState.edgeRight - CHARS_ON_SCREEN;
      if (currentState.edgeLeft < 0) currentState.edgeLeft = 0;

      currentState.buttons[4][3] = '=';
      currentState.cursorPos += currentState.displayedLines[currentState.currentLine].length;

      return {
        displayedLines: currentState.displayedLines,
        currentLine: 0,
        edgeRight: currentState.edgeRight,
        edgeLeft: currentState.edgeLeft,
        buttons: currentState.buttons,
        edgeBottom: 0,
      };
    });
  };

  specialButton = (symbol) => {
    if (symbol === '\u2191') this.moveLines('up');
    else if (symbol === '\u2193') this.moveLines('down');
    else if (symbol === 'copy') this.copyButton();
    else if (this.state.currentLine !== 0) return;
    else if (symbol === '=') this.equalsButton();
    else if (symbol === '\u2190') this.moveCursor('left');
    else if (symbol === '\u2192') this.moveCursor('right');
    else if (symbol === 'AC') this.acButton();
    else if (symbol === '\u232B') this.deleteButton();
  };

  specialChar = (symbol) => {
    if (symbol === 'x!') {
      return '!';
    }

    if (symbol === 'ln') {
      if (4 + this.state.displayedLines[0].length <= MAX_LINE_LENGTH) {
        this.setState((currentState) => {
          currentState.edgeRight += 3;
          currentState.cursorPos += 2;
          // Correct edgeRight and edgeLeft if ln is being added 3 characters or less from the left side of the screen
          if (
            currentState.edgeRight > CHARS_ON_SCREEN - 1 &&
            currentState.cursorPos <= currentState.edgeLeft + 5
          ) {
            currentState.edgeRight += -3 + currentState.cursorPos + CHARS_ON_SCREEN - currentState.edgeRight;
            currentState.edgeLeft = currentState.edgeRight - CHARS_ON_SCREEN;
          }
          return currentState;
        });
      }
      return 'ln()';
    }

    if (symbol === 'x\u207F') {
      return '^';
    }

    if (symbol === '\u221A') {
      if (3 + this.state.displayedLines[0].length <= MAX_LINE_LENGTH) {
        this.setState((currentState) => {
          currentState.edgeRight += 2;
          currentState.cursorPos += 1;
          // Correct edgeRight and edgeLeft if sqrt is being added 2 characters or less from the left side of the screen
          if (
            currentState.edgeRight > CHARS_ON_SCREEN - 1 &&
            currentState.cursorPos <= currentState.edgeLeft + 4
          ) {
            currentState.edgeRight += -2 + currentState.cursorPos + CHARS_ON_SCREEN - currentState.edgeRight;
            currentState.edgeLeft = currentState.edgeRight - CHARS_ON_SCREEN;
          }
          return currentState;
        });
      }
      return '\u221A()';
    }
  };

  addSymbol = (symbol, cursorPos) => {
    if (
      symbol === '=' ||
      symbol === '\u2190' || // left
      symbol === '\u2192' || // right
      symbol === 'AC' ||
      symbol === '\u232B' || // delete
      symbol === '\u2191' || // up
      symbol === '\u2193' || // down
      symbol === 'copy'
    ) {
      this.specialButton(symbol);
      return 'specialButton';
    }

    // Skip the other buttons if the user isn't currently on the bottom line
    if (this.state.currentLine !== 0) return 'specialButton';

    if (
      symbol === 'x!' ||
      symbol === 'ln' ||
      symbol === 'x\u207F' || // x^n
      symbol === '\u221A' // sqrt()
    ) {
      symbol = this.specialChar(symbol);
    }

    if (symbol.length + this.state.displayedLines[0].length > MAX_LINE_LENGTH) {
      alert('200 character Max');
      return 'specialButton';
    }

    this.setState((currentState) => {
      currentState.displayedLines[0] = currentState.displayedLines[0]
        .slice(0, cursorPos)
        .concat(symbol)
        .concat(currentState.displayedLines[0].slice(cursorPos));
      if (
        currentState.cursorPos === currentState.edgeLeft &&
        currentState.displayedLines[0].length > CHARS_ON_SCREEN
      ) {
        currentState.edgeLeft -= 1;
        currentState.edgeRight -= 1;
      }
      return {
        displayedLines: currentState.displayedLines,
        edgeLeft: currentState.edgeLeft,
        edgeRight: currentState.edgeRight,
      };
    });
  };

  clicked = (symbol) => {
    const { cursorPos } = this.state;

    if (this.addSymbol(symbol, cursorPos) === 'specialButton') return;

    this.setState((currentState) => {
      currentState.cursorPos++;
      currentState.edgeRight++;
      if (currentState.edgeRight >= CHARS_ON_SCREEN) {
        currentState.edgeLeft = currentState.edgeRight - CHARS_ON_SCREEN;
      }
      return currentState;
    });
  };

  onClick = (theButton) => {
    this.clicked(theButton.state.symbol);
  };

  clickScreen = (event) => {
    const { cursorPos, edgeRight, edgeLeft } = this.state;

    if (this.state.currentLine !== 0) return;

    const x = event.pageX;
    const y = event.pageY;
    const boundaryLowX = 56 + (CHARS_ON_SCREEN - (edgeRight - edgeLeft)) * CHAR_SIZE;
    const boundaryHighX = 56 + CHARS_ON_SCREEN * CHAR_SIZE;
    const boundaryLowY = 80 + (this.state.rowsOnScreen - 2) * 35;
    const boundaryHighY = 115 + (this.state.rowsOnScreen - 2) * 35;
    console.log(x, y);
    let clickPx;

    if (
      y >= boundaryLowY &&
      y <= boundaryHighY &&
      x >= boundaryLowX &&
      x <= boundaryHighX
    ) {
      for (let cursorSpot = boundaryLowX; ; cursorSpot += CHAR_SIZE) {
        if (x >= cursorSpot && x < cursorSpot + CHAR_SIZE) {
          clickPx =
            x >= cursorSpot + CHAR_SIZE / 2
              ? cursorSpot + CHAR_SIZE
              : cursorSpot;
          break;
        }
      }
      const newCursorPos = Math.round((clickPx - boundaryLowX) / CHAR_SIZE) + edgeLeft;

      for (let x = 0; x < Math.abs(newCursorPos - cursorPos); x++) {
        if (newCursorPos < cursorPos) this.moveCursor('left');
        else if (newCursorPos > cursorPos) this.moveCursor('right');
        else break;
      }
    }
  };

  getHeight = () => {
    return {
      height: (this.state.rowsOnScreen * 35 + 3) + 320 + 'px'
    }
  }

  editNumberOfRows = (action) => {
    if (action === 'add' && this.state.rowsOnScreen < 10) {
      this.setState(currentState => {
        if (currentState.edgeTop === currentState.rowsOnScreen && currentState.displayedLines.length > currentState.edgeTop) {
          currentState.edgeTop++;
        }
        return {
          rowsOnScreen: currentState.rowsOnScreen + 1,
          edgeTop: currentState.edgeTop
        }
      });
    } else if (action === 'delete' && this.state.rowsOnScreen > 2) {
      this.setState(currentState => {
        if (currentState.edgeTop - currentState.edgeBottom === currentState.rowsOnScreen) {
          currentState.edgeTop--;
          if (currentState.currentLine === currentState.rowsOnScreen - 1 + currentState.edgeBottom) {
            currentState.currentLine--;
          }
        }
        return {
          edgeTop: currentState.edgeTop,
          currentLine: currentState.currentLine,
          rowsOnScreen: currentState.rowsOnScreen - 1,
        }
      });
    }
  }

  render() {
    console.log('-------------------');
    console.log('displayedLines during render:', this.state.displayedLines);
    console.log('Display index range:', this.state.edgeLeft, '-', this.state.edgeRight);
    console.log('CursorPos:', this.state.cursorPos);
    console.log('Row index range:', this.state.edgeBottom, '-', this.state.edgeTop);
    console.log('Current line', this.state.currentLine);

    return (
      <div
        id='calculator-body'
        className='calc-body'
        style = {this.getHeight()}
        onKeyPress={this.handleKeyPress}
        onKeyDown={this.handleKeyPressOther}
        onClick={this.clickScreen}
      >
        <br />
        <button className='delete-row-button' onClick={() => this.editNumberOfRows('delete')} />
        <CalcScreen
          lines={this.state.displayedLines}
          edgeRight={this.state.edgeRight}
          edgeLeft={this.state.edgeLeft}
          edgeBottom={this.state.edgeBottom}
          cursorPos={this.state.cursorPos}
          currentLine={this.state.currentLine}
          rowsOnScreen={this.state.rowsOnScreen}
        />
        <div style={{ height: '8px' }} />
        <button className='add-row-button' onClick={() => this.editNumberOfRows('add')} />
        <div style={{ height: '13px' }} />
        <CalcButtons
          buttons={this.state.buttons}
          click={this.onClick}
          currentLine={this.state.currentLine}
        />
      </div>
    );
  }
}

export default Calculator;
