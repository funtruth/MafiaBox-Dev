import React from 'react'

class Modal extends React.Component {
    _onClick = e => {
        if (e.target.id === 'parent-only') {
            //TODO this is broken for un-original clicks. See AppWrapper 64
            //onClick triggers when click starts in modal but ends outside the modal
            this.props.onClose()
        }
    }

    render() {
        const { children, showSaveDialogue } = this.props
        
        if (showSaveDialogue) {
            return (
                <div id="parent-only" className="modal" onClick={this._onClick}>
                    <div style={{ pointerEvents: 'none' }}>
                        <div className="modal-child" style={{ pointerEvents: 'all' }}>
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