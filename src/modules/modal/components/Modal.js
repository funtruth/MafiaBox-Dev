import React from 'react'
import { modalType } from '../types';

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
        
        let extraStyle = {}
        switch(children.key) {
            case modalType.editPriority:
                extraStyle = {
                    position: 'absolute',
                    maxHeight: '80vh',
                    top: '10vh',
                }
                break
            default:
        }

        if (showSaveDialogue) {
            return (
                <div id="parent-only" className="modal" onClick={this._onClick}>
                    <div style={{ pointerEvents: 'none', ...extraStyle }}>
                        <div className="modal-child" style={{ pointerEvents: 'all' }}>
                            {children}
                        </div>
                    </div>
                </div>
            )
        }
        
        return (
            <div className="modal modal-appclick">
                <div className="modal-child" style={extraStyle}>
                    {children}
                </div>
            </div>
        )
    }
}

export default Modal