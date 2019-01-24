import React from 'react'
import { connect } from 'react-redux'

import { variableType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

class PickVarType extends React.Component{
    _renderItem = (item) => {
        const { currentValue } = this.props

        const chosen = typeof currentValue === 'string' && currentValue === item
        
        const itemStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        }

        return (
            <div
                key={item}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._select.bind(this, item)}
                style={itemStyle}
            >
                <i className={`${variableType[item].icon} drop-down-menu-icon`}/>
                {variableType[item].title}
                {chosen ?
                    <i className="mdi mdi-check"/>
                    :<div style={{ width: 30, marginLeft: 'auto' }}/>
                }
            </div>
        )
    }

    _select = (newValue) => {
        const { pageKey, fieldKey, indexKey } = this.props
        
        this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'variableType', newValue)
        this.props.showDropdown()
    }

    render() {
        return (
            Object.keys(variableType).map(this._renderItem)
        )
    }
}

export default connect(
    state => ({
        pageRepo: state.page.pageRepo,
    }),
    {
        updatePageByPath,
    }
)(PickVarType)