import "../styles/calcDisplay.css";

const CalcScreen = (props) => {
    let cursorPos = props.cursorPos;

    function userLine (line) {
        console.log('line being formatted:', line);
        let returnLine = "";
        if (props.edgeLeft > 0)
            returnLine = returnLine.concat("\u2039")
        returnLine = returnLine.concat(line.slice(props.edgeLeft, props.edgeRight));
        if (props.edgeRight < line.length)
            returnLine = returnLine.concat("\u203A");

        return returnLine;
    };

    function displayLine(line) {
        if (line.length < 21) return line;
        return "\u2039".concat(line.slice(line.length - 21))
    };

    function putCursor() {
        let pos = 27 + 16.5 * (22 - props.edgeRight + cursorPos);
        if (props.lines[0].length > 21) {
            if (props.edgeRight < props.lines[0].length)
                pos = pos - 11;
            if (props.edgeLeft === 0)
                pos = pos - 5.5;
        }

        return {left : pos + 'px'}
    }

    return (
        <div id='calc-screen' className="flex calc-screen">
            <div id='number-display' className="flex-body" style={{ fontFamily: "Consolas" }}>
                {displayLine(props.lines[3])}
                <br />
                {displayLine(props.lines[2])}
                <br />
                {displayLine(props.lines[1])}
                <br />
                {userLine(props.lines[0])}
                <div id='cursor-display' className='calc-cursor' style = {putCursor()}>
                    |
                </div>
            </div>
        </div>
    );
  }

  export default CalcScreen;