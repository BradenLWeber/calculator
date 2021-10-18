import React, { Component } from "react";
import Calculator from "./components/Calculator";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Calculator />
        <br/><br/><br/>
        <div style={{backgroundColor: 'gray', height: 3, width: 481}} />
        <br/>
        <p style={{marginTop: 0, marginBottom: 2, fontSize: 12}}>
          Project managed on&nbsp;
          <a href='https://github.com/BradenLWeber/calculator'>
            GitHub
          </a>
        </p>
        <p style={{marginTop: 0, marginBottom: 2, fontSize: 12}}>
          Server hosted on&nbsp;
          <a href='https://www.netlify.com/'>
            Netlify
          </a>
        </p>
        <p style={{marginTop: 0, marginBottom: 2, fontSize: 12}}>
          Started on 10/7/21 and maintained by&nbsp;
          <a href='https://www.linkedin.com/in/braden-weber-6b04b0174/'>
            Braden Weber
          </a>
        </p>
        <br/>
        <p style={{marginTop: 0, fontSize: 12}}>
          Note: this app seems to have visual bugs on some devices. I'm working on it!
        </p>
      </React.Fragment>
    );
  }
}

export default App;
