import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { returnType } from '../../logic/types'
import { modalType } from '../../modal/types';

import { showModal } from '../../modal/ModalReducer'
import DropTitle from '../components/DropTitle';

class ReturnTypes extends React.Component{
    _renderItem = (item) => {
        const { attach } = this.props
        const chosen = item.key === attach.key

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                <i className="mdi mdi-check"/>
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
        const { attach } = this.props
        const data = _.orderBy(returnType, i => i.index)

        const toastChosen = attach.key === 'toast'

        return (
            <div>
                <DropTitle>return types</DropTitle>
                {data.map(this._renderItem)}
                <DropTitle>other</DropTitle>
                <div
                    className="drop-down-menu-option"
                    chosen={toastChosen.toString()}
                    onClick={this._onToast}
                >
                    <i className="drop-down-menu-icon mdi mdi-comment-processing"></i>
                    toaster
                    <i className="mdi mdi-check"/>
                </div>
            </div>
        )
    }
}

export default connect(
    null,
    {
        showModal,
    }
)(ReturnTypes)