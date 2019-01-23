import React from 'react'

class NumberField extends React.Component{
    _incre = () => {
        const { value, pageKey, fieldKey } = this.props
        //TODO 1111
        this.props.updatePageByPath(pageKey, fieldKey, value + 1)
    }
    
    _decre = () => {
        const { value, pageKey, fieldKey } = this.props
        this.props.updatePageByPath(pageKey, fieldKey, value - 1)
    }

    _onChange = e => {
        const { pageKey, fieldKey } = this.props
        this.props.updatePageByPath(pageKey, fieldKey, e.target.value)
    }

    render() {
        const { value } = this.props

        return (
            <div className="row" style={{ alignItems: 'center' }}>
                <input
                    className="field-number-input"
                    value={value || ''}
                    onChange={this._onChange}
                    placeholder="0"
                    type="number"
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <i
                        className="field-number-inc mdi mdi-plus-box"
                        onClick={this._incre}
                    />
                    <i
                        className="field-number-inc mdi mdi-minus-box"
                        onClick={this._decre}
                    />
                </div>
            </div>
        )
    }
}

export default NumberField