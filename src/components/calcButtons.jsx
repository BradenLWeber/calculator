import CalcButton from './calcButton';

const CalcButtons = (props) => {
  return (
    <div id='calc-buttons'>
      {props.buttons[0].map((symbol) => (
        <CalcButton
          key={symbol}
          symbol={symbol}
          click={props.click}
          currentLine={props.currentLine}
        />
      ))}
      <br />
      {props.buttons[1].map((symbol) => (
        <CalcButton
          key={symbol}
          symbol={symbol}
          click={props.click}
          currentLine={props.currentLine}
        />
      ))}
      <br />
      {props.buttons[2].map((symbol) => (
        <CalcButton
          key={symbol}
          symbol={symbol}
          click={props.click}
          currentLine={props.currentLine}
        />
      ))}
      <br />
      {props.buttons[3].map((symbol) => (
        <CalcButton
          key={symbol}
          symbol={symbol}
          click={props.click}
          currentLine={props.currentLine}
        />
      ))}
      <br />
      {props.buttons[4].map((symbol) => (
        <CalcButton
          key={symbol}
          symbol={symbol}
          click={props.click}
          currentLine={props.currentLine}
        />
      ))}
    </div>
  );
};

export default CalcButtons;
