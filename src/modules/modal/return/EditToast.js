import React from 'react'

import ModalOptions from '../components/ModalOptions'
import ToastEditor from '../../strings/components/ToastEditor';

class EditToast extends React.Component {
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
                className="height-transition"
                cancel-appclick="true"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 600,
                    width: '45vw',
                }}
            >
                <ToastEditor {...this.props}/>
                <ModalOptions
                    onSave={this._onSave}
                    onClose={this.props.onClose}
                />
            </div>
        )
    }
}

export default EditToast