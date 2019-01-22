import React from 'react'

import ModalOptions from '../components/ModalOptions'
import ToastEditor from '../../strings/components/ToastEditor';

class EditToast extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            errorMessage: '',
        }
    }

    _onSave = () => {
        const { isTrigger, attach } = this.props
        const { string } = attach

        if (string.length === 0) {
            this.setState({
                errorMessage: 'Toast message cannot be empty.'
            })
            return
        }

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
                    width: '45vw',
                }}
            >
                <ToastEditor {...this.props}/>
                <ModalOptions
                    errorMessage={this.state.errorMessage}
                    onSave={this._onSave}
                    onClose={this.props.onClose}
                />
            </div>
        )
    }
}

export default EditToast