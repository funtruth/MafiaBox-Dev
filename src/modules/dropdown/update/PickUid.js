import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { variableType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

class PickUid extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props
        
        const chosen = typeof currentValue === 'string' && currentValue === item

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
            >
                {item.key}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    _select = (item) => {
        const { pageKey, fieldKey, indexKey, subfieldKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', `${subfieldKey}.$${item.key}`, 'value', '')
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', subfieldKey, 'expand', true)
        this.props.showDropdown()
    }

    render() {
        const { attach } = this.props
        const uids = _.filter(attach, i => i.variableType === variableType.uid.key)
        
        return (
            uids.length ?
                <div>
                    {uids.map(this._renderItem)}
                </div>
                :<div className="drop-down-item-padding" style={{ color: '#969696' }}>
                    There are no Unique IDs
                </div>
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
    }
)(PickUid)