import React from 'react'

class Modal extends React.Component {
    render() {
        const { children, zIndex } = this.props

        return (
            <div
                className="modal"
                style={{
                    zIndex,
                }}
            >
                <div className="modal-child">
                    {children}
                </div>
            </div>
        )
    }
}

export default Modal