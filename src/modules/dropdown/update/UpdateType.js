import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import { initUpdateType, toggleUpdateType } from '../../template/TemplateReducer'

import DropTitle from '../components/DropTitle'

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
        this.props.updatePage({
            [type]: !this.state[type],
        })
        this.setState({ [type]: !this.state[type] })
        this.props.toggleUpdateType(type)
    }

    render() {
        const { update, mutate } = this.state
        
        return (
            <div>
                <DropTitle>update type</DropTitle>
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
        updateRef: proptool.addPlayerRef(state.template),
    }),
    {
        initUpdateType,
        toggleUpdateType,
    }
)(UpdateType)