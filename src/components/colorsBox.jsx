import '../styles/colorBox.css';

const ColorsBox = (props) => {

    return (
        <div className={'colors-box colors-box-'.concat(props.colorScheme)} id='color-box'>
          <p className={'color-box-text color-box-text-'.concat(props.colorScheme)}>
            Change the color scheme
          </p>
          <div id='color-buttons' className='color-buttons'>
            <button
              onClick={() => props.setColor('default')}
              className={'color-button default-button-'.concat(props.colorScheme)}
            >
              Default
            </button>
            <button
              onClick={() => props.setColor('dark')}
              className={'color-button dark-button-'.concat(props.colorScheme)}
            >
              Dark
            </button>
            <button
              onClick={() => props.setColor('warm')}
              className={'color-button warm-button-'.concat(props.colorScheme)}
            >
              Warm
            </button>
            <button
              // onClick={() => props.setColor('cool')}
              className={'color-button cool-button-'.concat(props.colorScheme)}
            >
              Cool
            </button>
          </div>
        </div>
    )
}

export default ColorsBox;