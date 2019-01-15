import React from 'react'

import StringView from '../../strings/StringView'

class EditEvent extends React.Component {
    _onSave = () => {
        this.props.onSave()
        this.props.popModalBy(1)
    }
    
    render() {
        return (
            <div
                cancel-appclick="true"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 600,
                    width: '75vw',
                    minHeight: 400,
                    height: '60vh',
                }}
            >
                <StringView/>
                <div className="row dark-grey modal-options">
                    <div className="underline-button" onClick={this.props.onClose}>
                        Cancel
                    </div>
                    <div className="modal-button" onClick={this._onSave}>
                        Done
                    </div>
                </div>
            </div>
        )
    }
}

export default EditEvent