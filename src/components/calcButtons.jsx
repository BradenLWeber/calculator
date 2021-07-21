import CalcButton from './calcButton'

const CalcButtons = (props) => {
    return (
        <div id='buttons'>
            {props.buttons[0].map((symbol) => (
                <CalcButton key={symbol} symbol={symbol} click={props.click} />
            ))}
            <br />
            {props.buttons[1].map((symbol) => (
                <CalcButton key={symbol} symbol={symbol} click={props.click} />
            ))}
            <br />
            {props.buttons[2].map((symbol) => (
                <CalcButton key={symbol} symbol={symbol} click={props.click} />
            ))}
            <br />
            {props.buttons[3].map((symbol) => (
                <CalcButton key={symbol} symbol={symbol} click={props.click} />
            ))}
            <br />
            {props.buttons[4].map((symbol) => (
                <CalcButton key={symbol} symbol={symbol} click={props.click} />
            ))}
        </div>
      );
}

export default CalcButtons;