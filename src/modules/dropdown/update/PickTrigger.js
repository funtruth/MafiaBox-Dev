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
            valueType: item.valueType,
        })
        this.props.showDropdown()
    }

    _addTrigger = () => {
        this.props.showModal(modalType.editTrigger)
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { attach, subfieldKey } = this.props
        const value = attach[subfieldKey] && attach[subfieldKey].value
        const chosen = typeof value === 'string' && value === item.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    render() {
        const { subfieldKey, attach } = this.props
        const items = proptool.getSubfields(subfieldKey, attach)
        
        return (
            <div>
                {items.length ?
                    items.map(this._renderItem)
                    :<div className="drop-down-menu-option" empty="true">
                        No existing triggers
                    </div>
                }
                <div className="drop-down-menu-separator"/>
                <div
                    className="drop-down-menu-option"
                    onClick={this._addTrigger}
                >
                    <i className="drop-down-menu-icon mdi mdi-flag-plus"/>
                    add trigger
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
        updatePageByPath,
        showModal,
    }
)(PickTrigger)