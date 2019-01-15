import React from 'react'

class SaveChanges extends React.Component {
    _onSave = () => {
        this.props.onSave()
        this.props.popModalBy(2)
    }

    _onClose = () => {
        this.props.popModalBy(1)
    }

    _onQuit = () => {
        this.props.popModalBy(2)
    }

    render() {
        return (
            <div>
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        Save changes?
                    </div>
                    <div className="modal-subtitle">
                        your changes will be lost if you do not save.
                    </div>
                </div>
                <div className="row modal-options">
                    <div className="underline-button" onClick={this._onSave}>
                        Save
                    </div>
                    <div className="underline-button" onClick={this._onClose}>
                        Cancel
                    </div>
                    <div className="delete-button" onClick={this._onQuit}>
                        Don't Save
                    </div>
                </div>
            </div>
        )
    }
}

export default SaveChanges