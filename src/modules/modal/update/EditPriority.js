import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { boardType } from '../../fields/defaults'

import ModalOptions from '../components/ModalOptions'

class EditPriority extends React.Component {
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
    
    //TODO i want a clean ui/ux for showing priority, currently going to leavei t at a NumberField
    render() {
        const { pageRepo, fieldKey } = this.props
        let data = _.filter(pageRepo, i => i.boardType === boardType.roles.key && i[fieldKey])
        data = _.groupBy(data, i => i[fieldKey])
        console.log({data})

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
                <ModalOptions
                    onSave={this._onSave}
                    onClose={this.props.onClose}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    })
)(EditPriority)