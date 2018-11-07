import React from 'react'
import LabelWithEdit from './LabelWithEdit';

class ResizeInputItem extends React.Component{
    _onChange = e => {
        const { field } = this.props
        this.props.updateRoleInfo(field, e.target.value)
    }

    render() {
        const { label, placeholder, value, field } = this.props
        const autoFocus = field === 'roleName'

        return (
            <div className="field-wrapper">
                <LabelWithEdit label={label}/>
                <input
                    className="add-role-input"
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

export default ResizeInputItem