import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { dropdownType } from '../types'
import { variableType } from '../../logic/types'

import { updatePageByPath } from '../../page/PageReducer'

import DropParent from '../components/DropParent'

class PickVar extends React.Component{
    _onSelect = (item) => {
        const { attach, selectedKey, range } = this.props
        const selectedItem = selectedKey ? (attach.value && attach.value[selectedKey]) || {} : attach
        const string = selectedItem.string || ''

        const { startIndex, endIndex } = range
        
        this.props.updatePage({
            string: `${string.slice(0, startIndex)}${item.key}${string.slice(endIndex)}`
        })
        this.props.showDropdown()
    }

    _renderItem = (item) => {
        const { currentValue } = this.props
        const chosen = typeof currentValue === 'string' && currentValue === item.key
        
        const isObject = item.variableType === variableType.object.key

        if (isObject) {
            return (
                <DropParent
                    {...this.props}
                    key={item.key}
                    dropdownType={dropdownType.pickEventVarProp}
                    params={{
                        prefix: item.key,
                    }}
                    text={item.key}
                />
            )
        }

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={this._onSelect.bind(this, item)}
            >
                {item.key}
                {chosen && <i className="ion-md-checkmark"/>}
            </div>
        )
    }

    render() {
        const { attachVar } = this.props
        if (!attachVar) return null

        const vars = _.toArray(attachVar)
        const uids = vars.filter(i => i.variableType === variableType.uid.key)
        const otherVars = vars.filter(i => i.variableType !== variableType.uid.key && !i.rss)
        const rssVars = vars.filter(i => i.rss)

        return (
            <div>
                {uids.length > 0 && <div>
                    <div className="-sep"/>
                    <div className="drop-down-title">UIDS</div>
                    <div className="drop-down-scrollable">
                        {uids.map(this._renderItem)}
                    </div>
                </div>}
                {otherVars.length > 0 && <div>
                    <div className="-sep"/>
                    <div className="drop-down-title">VARIABLES</div>
                    <div className="drop-down-scrollable">
                        {otherVars.map(this._renderItem)}
                    </div>
                </div>}
                {rssVars.length > 0 && <div>
                    <div className="-sep"/>
                    <div className="drop-down-title">GAME VARIABLES</div>
                    <div className="drop-down-scrollable">
                        {rssVars.map(this._renderItem)}
                    </div>
                </div>}
            </div>
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
    }
)(PickVar)