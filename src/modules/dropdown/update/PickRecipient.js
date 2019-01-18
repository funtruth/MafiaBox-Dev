import React from 'react'
import _ from 'lodash'

import { variableType, updateViewType } from '../../logic/types'

class PickRecipient extends React.Component{
    _pickUid = (item, info) => {
        const { selectionType } = this.props
        const otherType = selectionType === 'showTo' ? 'hideFrom' : 'showTo'

        this.props.updatePage({
            [selectionType]: {
                ...info,
                [item.key]: !info[item.key],
            },
            [otherType]: {},
        })
    }

    _pickEveryone = () => {
        this.props.updatePage({
            showTo: {},
            hideFrom: {},
        })
        this.props.showDropdown()
    }

    render() {
        const { attach, attachVar, selectionType, selectedKey } = this.props
        const uids = _.filter(attachVar, i => i.variableType === variableType.uid.key)

        const inclusive = selectionType === 'showTo'
        
        const selectedItem = (attach.value && attach.value[selectedKey]) || {}
        const info = selectedItem[selectionType] || {}
        const everyone = Object.keys(selectedItem.showTo).length === 0
        
        return (
            <div>
                {uids.length ?
                    <div>
                        {uids.map(item => {
                            const chosen = info[item.key] || false

                            return(
                                <div
                                    key={item.key}
                                    className="drop-down-menu-option"
                                    chosen={chosen.toString()}
                                    onClick={this._pickUid.bind(this, item, info)}
                                >
                                    {item.key}
                                    {chosen && <i className="ion-md-checkmark"/>}
                                </div>
                            )
                        })}
                    </div>
                    :<div className="drop-down-item-padding" style={{ color: '#969696' }}>
                        There are no Unique IDs
                    </div>}
                {inclusive && <div>
                    <div className="-separator"/>
                    <div
                        className="drop-down-menu-option"
                        chosen={everyone.toString()}
                        onClick={this._pickEveryone}
                    >
                        <i className="mdi mdi-earth drop-down-menu-icon"/>
                        everyone
                        {everyone && <i className="ion-md-checkmark"/>}
                    </div>
                </div>}
            </div>
        )
    }
}

export default PickRecipient