import React, { Component } from 'react';
import '../styles/buttons.css';

class CalcButton extends Component {
  state = {
    button: '',
    symbol: this.props.symbol,
  };

  constructor(props) {
    super(props);
    const { symbol } = props;
    if (symbol === '\u2191' || symbol === '\u2193') this.state.button = 'button-up-down';
    else if (symbol === '\u2190') this.state.button = 'button-left';
    else if (symbol === '\u2192') this.state.button = 'button-right';
    else if (symbol === '=') this.state.button = 'button-equals';
    else if (symbol === 'AC') this.state.button = 'button-ac';
    else if (symbol === '\u232B') this.state.button = 'button-delete';
    else if (symbol === 'x!' || symbol === '\u221A') this.state.button = 'button-left-side';
    else
      try {
        eval(symbol);
        this.state.button = 'button-number';
      } catch (err) {
        if (symbol === '.') this.state.button = 'button-number';
      }
    if (this.state.button === '') this.state.button = 'button-operator';
  }

  makeId = () => {
    return 'button-'.concat(String(this.state.symbol.charCodeAt(0)));
  }

  render() {
    return (
      <button
        id={this.makeId()}
        key={this.makeId()}
        onClick={() => this.props.click(this)}
        className={this.state.button}
      >
        {this.props.symbol}
      </button>
    );
  }
}

export default CalcButton;
