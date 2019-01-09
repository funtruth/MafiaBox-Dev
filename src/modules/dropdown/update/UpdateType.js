import React from 'react'
import { connect } from 'react-redux'

import { updatePageByPath } from '../../page/PageReducer'
import { toggleUpdateType } from '../../template/TemplateReducer'

class UpdateType extends React.Component{
    _handleClick = (type, e) => {
        this.props.toggleUpdateType(type)
    }

    render() {
        const { update, mutate } = this.props

        return (
            <div>
                <div className="drop-down-menu-separator"/>
                <div
                    className="drop-down-menu-option"
                    onClick={this._handleClick.bind(this, 'update')}
                >
                    <input type="checkbox" checked={update} readOnly/>
                    update
                </div>
                <div
                    className="drop-down-menu-option"
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
    }),
    {
        updatePageByPath,
        toggleUpdateType,
    }
)(UpdateType)