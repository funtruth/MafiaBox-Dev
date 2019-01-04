import React from 'react'

import { dropdownType } from '../../dropdown/types'

class AddUpdateButton extends React.Component{
    render() {
        const { field, pageInfo, logicInfo, item, prefix, updates, vars } = this.props
        const info = logicInfo.data[prefix] || {}

        let attachments = ""
        switch(updates.dropdownType) {
            case dropdownType.pickUid:
                attachments = vars
                break
            case dropdownType.pickUpdate:
                attachments = info.dynamic
                break
            default:
        }
        
        return (
            <div
                className="logic-pick-update menu-onclick highlight"
                menu-type={(updates && updates.dropdownType) || dropdownType.addUpdateField}
                page-key={pageInfo.pageKey}
                index-key={item}
                field-key={field}
                subfield-key={prefix}
                current-value={info.value}
                attach={JSON.stringify(attachments)}
            >
                <div style={{ pointerEvents: 'none', color: '#767676' }}>
                    Add</div>
            </div>
        )
    }
}

export default AddUpdateButton