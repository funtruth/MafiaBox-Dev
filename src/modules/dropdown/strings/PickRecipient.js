import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'
import DropTitle from '../components/DropTitle';

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
        this.props.showDropdown()
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
        const everyone = Object.keys(selectedItem.showTo || {}).length === 0
        
        return (
            <div>
                <DropTitle>uids</DropTitle>
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
                                    <i className="mdi mdi-check"/>
                                </div>
                            )
                        })}
                    </div>
                    :<div className="drop-down-empty">
                        no UIDs found
                    </div>}
                {inclusive && <div>
                    <div className="-sep"/>
                    <div
                        className="drop-down-menu-option"
                        chosen={everyone.toString()}
                        onClick={this._pickEveryone}
                    >
                        <i className="mdi mdi-earth drop-down-menu-icon"/>
                        everyone
                        <i className="mdi mdi-check"/>
                    </div>
                </div>}
            </div>
        )
    }
}

export default PickRecipient