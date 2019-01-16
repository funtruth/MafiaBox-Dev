import React from 'react'

import StringDashboard from '../../strings/StringDashboard';

class EditEvent extends React.Component {
    _onSave = () => {
        const { isTrigger } = this.props

        if (isTrigger) {

        } else {
            this.props.onSave()
            this.props.popModalBy(1)
        }
    }
    
    render() {
        return (
            <div
                className="height-transition"
                cancel-appclick="true"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 600,
                    width: '75vw',
                    maxHeight: '60vh',
                }}
            >
                <StringDashboard {...this.props}/>
                <div className="row modal-options">
                    <div className="modal-button" onClick={this._onSave}>
                        Save
                    </div>
                    <div className="underline-button" onClick={this.props.onClose}>
                        Cancel
                    </div>
                </div>
            </div>
        )
    }
}

export default EditEvent