import React from 'react'
import { connect } from 'react-redux'

import { showModalByKey } from '../../../modal/ModalReducer'

import { modalType } from '../../../modal/modalConfig'

class OtherValues extends React.Component{
    _onDelete = () => {
        this.props.hideMenu()
        this.props.showModalByKey(modalType.deleteStory, {
            storyIndex: this.props.storyIndex,
        })
    }

    _renderItem = (item) => {
        return (
            <div key={item.key} className="drop-down-menu-option">
                {item.title}
            </div>
        )
    }

    render() {
        const { dropdownParams, fieldRepo } = this.props
        const { fieldKey, pageX, pageY } = dropdownParams

        if (!fieldKey) return null
        const fieldInfo = fieldRepo[fieldKey]

        let menuStyle = {
            top: pageY,
            left: pageX,
        }

        return (
            <div className="drop-down-menu" style={menuStyle}>
                {fieldInfo.data.map(this._renderItem)}
            </div>
        )
    }
}

export default connect(
    state => ({
        dropdownParams: state.dropdown.dropdownParams,
        fieldRepo: state.field.fieldRepo,
    }),
    {
        showModalByKey,
    }
)(OtherValues)