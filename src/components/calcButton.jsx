import React, { Component } from 'react';
import '../styles/buttons.css';

class CalcButton extends Component {
  state = {
    button: 'button',
    symbol: this.props.symbol,
  };

  constructor(props) {
    super(props);
    const { symbol } = props;

    this.state.colorScheme = props.colorScheme;

    if (symbol === '\u2191' || symbol === '\u2193') this.state.button += ' button-up-down button-arrow-';
    else if (symbol === '\u2190') this.state.button += ' button-left button-arrow-';
    else if (symbol === '\u2192') this.state.button += ' button-right button-arrow-';
    else if (symbol === '=' || symbol === 'copy') this.state.button += ' button-equals button-equals-';
    else if (symbol === 'AC') this.state.button += ' button-ac button-ac-';
    else if (symbol === '\u232B') this.state.button += ' button-delete button-delete-';
    else if (symbol === 'x!' || symbol === '\u221A') this.state.button += ' button-left-side button-operator-';
    else
      try {
        eval(symbol);
        this.state.button += ' button-number button-number-';
      } catch (err) {
        if (symbol === '.') this.state.button += ' button-number button-number-';
      }

    if (this.state.button === 'button') {
      this.state.button += ' button-operator button-operator-';
    }
  }

  makeId = () => {
    return 'button-'.concat(String(this.state.symbol.charCodeAt(0)));
  };

  render() {
    return (
      <button
        id={this.makeId()}
        key={this.makeId()}
        onClick={() => this.props.click(this)}
        className={this.state.button.concat(this.props.colorScheme)}
      >
        {this.state.symbol}
      </button>
    );
  }
}

export default CalcButton;
