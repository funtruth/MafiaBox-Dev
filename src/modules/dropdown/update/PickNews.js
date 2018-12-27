import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { fieldType } from '../../fields/defaults'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

class PickNews extends React.Component{
    _renderItem = (item, index) => {
        const { currentValue } = this.props
        const selected = typeof currentValue === 'string' && currentValue === item.value

        return (
            <div
                key={index}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6',
                    maxWidth: 200,
                }}
            >
                <div className="text-ellipsis">
                    {item.value}
                </div>
                {selected && <i
                    className="ion-md-checkmark"
                    style={{
                        marginLeft: 'auto',
                        width: 30,
                        textAlign: 'center',
                    }}
                />}
            </div>
        )
    }

    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, item)
        this.props.showDropdownByKey()
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
                <div className="drop-down-menu-separator"/>
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
        showDropdownByKey,
    }
)(PickNews)