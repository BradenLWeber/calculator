import React, { Component } from "react";
import Calculator from "./components/Calculator";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Calculator />
        <br/><br/>
        <p style={{marginBottom: 2}}>
          Server started 10/7/21 by&nbsp;
          <a href='https://www.linkedin.com/in/braden-weber-6b04b0174/'>
            Braden Weber
          </a>
        </p>
        <p style={{marginTop: 0, marginBottom: 2}}>
          Project managed on&nbsp;
          <a href='https://github.com/BradenLWeber/calculator'>
            GitHub
          </a>
        </p>
        <br/>
        <p style={{marginTop: 0}}>
          Note: this app designed to be run on a computer, not on a mobile device
        </p>
      </React.Fragment>
    );
  }
}

export default App;
