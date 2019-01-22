import React from 'react'

import StringDashboard from '../../strings/StringDashboard';
import ModalOptions from '../components/ModalOptions'

class EditEvent extends React.Component {
    _onSave = () => {
        const { isTrigger } = this.props

        if (isTrigger) {
            this.props.popModalBy(1)
            this.props.onAttach()
        } else {
            this.props.onSave()
            this.props.popModalBy(1)
        }
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
                }}
            >
                <StringDashboard {...this.props}/>
                <ModalOptions
                    onSave={this._onSave}
                    onClose={this.props.onClose}
                />
            </div>
        )
    }
}

export default EditEvent