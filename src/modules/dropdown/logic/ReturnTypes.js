import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { updatePageByPath } from '../../page/PageReducer'

import { returnType } from '../../logic/types'

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
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', newValue)
        this.props.showDropdown()
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
    }
)(ReturnTypes)