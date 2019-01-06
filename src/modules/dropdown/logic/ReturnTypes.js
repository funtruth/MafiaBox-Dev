import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { showDropdownByKey } from '../DropdownReducer'
import { updatePageByPath } from '../../page/PageReducer'

import { returnType } from '../../logic/types'

class ReturnTypes extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const selected = item.key === currentValue

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                onClick={this._select.bind(this, item.key)}
                style={{
                    color: selected ? '#fff' : '#b6b6b6',
                    backgroundColor: selected && item.color,
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
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

    _select = (newValue) => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', newValue)
        this.props.showDropdownByKey()
    }

    render() {
        const data = _.orderBy(returnType, i => i.index)

        return (
            data.map(this._renderItem)
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
        showDropdownByKey,
    }
)(ReturnTypes)