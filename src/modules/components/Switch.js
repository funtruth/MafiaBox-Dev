import React from 'react';
import './Switch.css'

export default function Switch(props) {
    const {
        switched,
        style,
    } = props

    const handleChange = (event) => {
        const { checked } = event.target;
        if (props.onChange) {
            props.onChange({ event, value: checked });
        }
    };

    const switchClasses = [
        '--switch',
        `--switch-${switched ? 'on' : 'off'}`,
    ].join(" ")

    const inputClasses = [
        '--switch-input',
    ].join(" ")

    const sliderClasses = [
        '--switch-slider',
        `--switch-slider-${switched ? 'right' : 'left'}`,
    ].join(" ")

    return (
        <div className={switchClasses} style={style}>
            <input
                className={inputClasses}
                checked={switched}
                onChange={handleChange}
                type="checkbox"
            />
            <div className={sliderClasses}/>
        </div>
    );
}