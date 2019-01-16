import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fieldType } from '../../fields/defaults'

import { updatePageByPath } from '../../page/PageReducer'

class PickNews extends React.Component{
    _renderItem = (item, index) => {
        const { currentValue } = this.props
        const chosen = typeof currentValue === 'string' && currentValue === item.value

        return (
            <div
                key={index}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
                style={{
                    maxWidth: 200,
                }}
            >
                <div className="text-ellipsis">
                    {item.value}
                </div>
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, item)
        this.props.showDropdown()
    }

    render() {
        const { pageRepo, pageKey, fieldRepo } = this.props
        
        const stringKeys = _.filter(Object.keys(pageRepo[pageKey]),
            i => fieldRepo[i] && fieldRepo[i].fieldType === fieldType.strings.key)
            
        let stringArr = []
        stringKeys.map(i => stringArr = stringArr.concat(_.toArray(pageRepo[pageKey][i])))
        
        return (
            <div>
                {stringArr.map(this._renderItem)}
                <div className="-separator"/>
            </div>
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
        fieldRepo: state.field.fieldRepo,
    }),
    {
        updatePageByPath,
    }
)(PickNews)