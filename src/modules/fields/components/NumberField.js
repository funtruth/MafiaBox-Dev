import React from 'react'

export default function NumberField(props) {
    const { value, path } = props

    let handleIncr = () => props.updatePage(path, parseInt(value || 0) + 1)
    let handleDecr = () => props.updatePage(path, parseInt(value || 0) - 1)
    let handleChange = e => props.updatePage(path, e.target.value)

    return (
        <div className="row" style={{ alignItems: 'center' }}>
            <input
                className="field-number-input"
                value={value || 0}
                onChange={handleChange}
                type="number"
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <i onClick={handleIncr} className="field-number-inc mdi mdi-plus-box"/>
                <i onClick={handleDecr} className="field-number-inc mdi mdi-minus-box"/>
            </div>
        </div>
    )
}