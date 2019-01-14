import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../../logic/proptool'

import { updatePageByPath } from '../../page/PageReducer'
import { showModal } from '../../modal/ModalReducer'
import { modalType } from '../../modal/types';

class PickTrigger extends React.Component{
    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey, update, mutate } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, {
            update, mutate,
            value: item.key,
            updateViewType: item.updateViewType,
        })
        this.props.showDropdown()
    }

    _addTrigger = () => {
        const { attach, subfieldKey } = this.props
        this.props.showModal(modalType.editTrigger, {
            attach: attach[subfieldKey]
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
            >
                <i className="mdi mdi-flag drop-down-menu-icon"/>
                trigger
            </div>
        )
    }

    render() {
        const { subfieldKey, attach } = this.props
        const value = (attach[subfieldKey] && attach[subfieldKey].value) || {}
        
        return (
            Object.keys(value).length ?
                <div
                    className="drop-down-menu-option"
                    onClick={this._addTrigger}
                >
                    <i className="drop-down-menu-icon mdi mdi-flag"/>
                    edit trigger
                </div>
                :<div
                    className="drop-down-menu-option"
                    onClick={this._addTrigger}
                >
                    <i className="drop-down-menu-icon mdi mdi-flag-plus"/>
                    create trigger
                </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: proptool.addPlayerRef(state.template),
    }),
    {
        updatePageByPath,
        showModal,
    }
)(PickTrigger)