import React from 'react'

class InputItem extends React.Component{
    _onChange = e => {
        const { roleId, field } = this.props
        this.props.updateRoleInfo(roleId, field, e.target.value)
    }

    render() {
        const { label, placeholder, value, field } = this.props
        const autoFocus = field === 'roleName'

        return (
            <div style={styles.item}>
                <div style={styles.text}>
                    {label}
                </div>
                <input
                    className="add-role-input"
                    placeholder={placeholder}
                    type="text"
                    onInput={this._onChange}
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