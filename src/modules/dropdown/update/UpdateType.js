import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import { updatePageByPath } from '../../page/PageReducer'
import { updateTopModal } from '../../modal/ModalReducer'
import { initUpdateType, toggleUpdateType } from '../../template/TemplateReducer'

class UpdateType extends React.Component{
    constructor(props) {
        super(props)
        
        let init
        if (props.attach[props.subfieldKey] && props.attach[props.subfieldKey].value) {
            init = props.attach[props.subfieldKey]
        } else {
            init = proptool.getUpdateConfig(props.subfieldKey, props.updateRef)
        }

        props.initUpdateType(init)
        this.state = {
            update: false,
            mutate: false,
            ...init,
        }
    }

    _handleClick = type => {
        const { pageKey, fieldKey, indexKey, subfieldKey, attach, currentValue } = this.props
        

        if (proptool.isTrigger(currentValue || '')) {
            this.props.updateTopModal('attach', 'value', subfieldKey, type, !this.state[type])
        }

        if (attach[subfieldKey] && attach[subfieldKey].value) {
            this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, type, !this.state[type])
        }

        this.setState({ [type]: !this.state[type] })
        this.props.toggleUpdateType(type)
    }

    render() {
        const { update, mutate } = this.state
        
        return (
            <div>
                <div className="drop-down-menu-separator"/>
                <div
                    className="drop-down-menu-option"
                    chosen={update.toString()}
                    onClick={this._handleClick.bind(this, 'update')}
                >
                    <input type="checkbox" checked={update} readOnly/>
                    update
                </div>
                <div
                    className="drop-down-menu-option"
                    chosen={mutate.toString()}
                    onClick={this._handleClick.bind(this, 'mutate')}
                >
                    <input type="checkbox" checked={mutate} readOnly/>
                    mutate
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        update: state.template.update,
        mutate: state.template.mutate,
        updateRef: proptool.addPlayerRef(state.template),
    }),
    {
        updatePageByPath,
        updateTopModal,
        initUpdateType,
        toggleUpdateType,
    }
)(UpdateType)