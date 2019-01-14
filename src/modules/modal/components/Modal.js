import React from 'react'

class Modal extends React.Component {
    _onClick = e => {
        if (e.target.id === 'parent-only') {
            this.props.onClose()
        }
    }

    render() {
        const { children, requireSave } = this.props

        if (requireSave) {
            return (
                <div id="parent-only" className="modal" onClick={this._onClick}>
                    <div style={{ pointerEvents: 'none' }}>
                        <div className="modal-child"  style={{ pointerEvents: 'all' }}>
                            {children}
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className="modal modal-appclick">
                <div className="modal-child">
                    {children}
                </div>
            </div>
        )
    }
}

export default Modal