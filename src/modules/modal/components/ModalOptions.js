import React from 'react'

class ModalOptions extends React.Component {
    render() {
        return (
            <div className="row modal-options">
                <div
                    className="error-text"
                    style={{
                        marginLeft: 8,
                    }}
                >
                    {this.props.errorMessage || ''}
                </div>
                <div
                    className="modal-button"
                    onClick={this.props.onSave}
                    style={{
                        marginLeft: 'auto',
                    }}
                >
                    Save
                </div>
                <div
                    className="underline-button"
                    onClick={this.props.onClose}
                >
                    Cancel
                </div>
            </div>
        )
    }
}

export default ModalOptions