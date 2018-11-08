import React from 'react'

class InputItem extends React.Component{
    _onChange = e => {
        const { id, field } = this.props
        this.props.onChange(id, field, e.target.value)
    }

    render() {
        const { label, placeholder, value, autoFocus } = this.props

        return (
            <div style={styles.item}>
                <div style={styles.text}>
                    {label}
                </div>
                <input
                    className="form-input"
                    placeholder={placeholder}
                    type="text"
                    onChange={this._onChange}
                    value={value}
                    autoFocus={autoFocus}
                />
            </div>
        )
    }
}

const styles = {
    item: {
        padding: 4,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
        fontFamily: 'Arial',
        color: '#f6f6f7',
    }
}

export default InputItem