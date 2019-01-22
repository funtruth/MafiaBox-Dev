import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { returnType } from '../../logic/types'
import { modalType } from '../../modal/types';

import { showModal } from '../../modal/ModalReducer'
import { updatePageByPath } from '../../page/PageReducer'


class ReturnTypes extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const chosen = item.key === currentValue

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item.key)}
                style={{
                    backgroundColor: chosen && item.color,
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    _select = (newValue) => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', 'value', newValue)
        this.props.showDropdown()
    }

    _onToast = () => {
        const { attach } = this.props
        this.props.showModal(modalType.editToast, {
            attach: attach || {},
        })
        this.props.showDropdown()
    }

    render() {
        const data = _.orderBy(returnType, i => i.index)

        return (
            <div>
                {data.map(this._renderItem)}
                <div className="-sep"/>
                <div
                    className="drop-down-menu-option"
                    onClick={this._onToast}
                >
                    <i className="drop-down-menu-icon mdi mdi-bread-slice"></i>
                    toaster
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
        showModal,
    }
)(ReturnTypes)