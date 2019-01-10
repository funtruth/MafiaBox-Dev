import React from 'react'

class Modal extends React.Component {
    render() {
        const { children } = this.props

        return (
            <div className="modal app-onclick" onClick={this._onClose}>
                <div className="modal-child">
                    {children}
                </div>
            </div>
        )
    }
}

export default Modal