import React from 'react'

export default function NumberField({ value, path, updateGeneral }) {
    let handleIncr = () => {
        updateGeneral({
            path,
            update: Math.min(1000, parseInt(value || 0) + 1)
        })
    }

    let handleDecr = () => {
        updateGeneral({
            path,
            update: Math.max(0, parseInt(value || 0) - 1)
        })
    }

    let handleChange = e => {
        let number = e.target.value

        //set range between 0 and 1000
        number = Math.max(Math.min(number, 1000), 0)

        updateGeneral({
            path,
            update: number
        })
    }

    return (
        <div className="row">
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