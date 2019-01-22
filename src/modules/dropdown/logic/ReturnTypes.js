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
                onClick={this._select.bind(this, item)}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    _select = (item) => {
        this.props.updatePage({
            key: item.key,
            string: '',
        })
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
        const { currentValue } = this.props
        const data = _.orderBy(returnType, i => i.index)

        const toastChosen = currentValue === 'toast'

        return (
            <div>
                {data.map(this._renderItem)}
                <div className="-sep"/>
                <div
                    className="drop-down-menu-option"
                    chosen={toastChosen.toString()}
                    onClick={this._onToast}
                >
                    <i className="drop-down-menu-icon mdi mdi-bread-slice"></i>
                    toaster
                    {toastChosen && <i className="ion-md-checkmark"/>}
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