import React, { Component } from "react";
import "../styles/buttons.css";

class CalcButton extends Component {
  state = {
    button: "button",
    symbol: this.props.symbol,
  };

  constructor(props) {
    super(props);
    const { symbol } = props;
    if (symbol === "\u2191" || symbol === "\u2193")
      this.state.button = "buttonUpDown";
    else if (symbol === "\u2190") this.state.button = "buttonLeft";
    else if (symbol === "\u2192") this.state.button = "buttonRight";
    else if (symbol === "=") this.state.button = "buttonEquals";
    else if (symbol === "AC" || symbol === "\u232B") this.state.button = "buttonRed";
    else if (symbol === "x!" || symbol === "\u221A")
      this.state.button = "buttonLeftSide";
    else
      try {
        eval(symbol);
        this.state.button = "buttonNumber";
      } catch (err) {
        if (symbol === ".") this.state.button = "buttonNumber";
      }
  }

  makeId = () => {
    return 'button-'.concat(String(this.state.symbol.charCodeAt(0)));
  }

  render() {
    return (
      <React.Fragment>
        <button
          id={this.makeId()}
          key={this.makeId()}
          onClick={() => this.props.click(this)}
          className={this.state.button}
        >
          {this.props.symbol}
        </button>
      </React.Fragment>
    );
  }
}

export default CalcButton;
