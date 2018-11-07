import React from 'react'
import LabelWithEdit from './LabelWithEdit';

class ResizingInputItem extends React.Component{
    componentDidMount() {
        window.addEventListener('change', this.resize)
        window.addEventListener('cut', this.delayedResize)
        window.addEventListener('paste', this.delayedResize)
        window.addEventListener('drop', this.delayedResize)
        window.addEventListener('keydown', this.delayedResize)
    }

    resize = () => {
        let text = document.getElementById(`text-${this.props.field}`)
        text.style.height = 'auto'
        text.style.height = text.scrollHeight + 'px'
    }

    delayedResize = () => {
        window.setTimeout(this.resize, 0)
    }

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
                <textarea
                    id={`text-${field}`}
                    rows="1"
                    className="resizing-input"
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

export default ResizingInputItem