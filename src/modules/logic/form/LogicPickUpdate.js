import React from 'react'
import { valueType } from '../types';

class LogicPickUpdate extends React.Component{
    _renderItem = (value) => {
        const ids = value.split('-')
        switch(ids[0]) {
            case 'phase':
                return (
                    <div
                        style={{
                            fontSize: 17,
                            textAlign: 'center',
                            pointerEvents: 'none',
                        }}
                    >...
                    </div>
                )
            default:
                return (
                    <i
                        className={`${valueType[value].icon} drop-down-menu-icon`}
                    />
                )
        }
    }

    render() {
        const { room, field, pageInfo, logicInfo, item, prefix } = this.props
        const { dropdownType } = room
        const value = (logicInfo.data[prefix] && logicInfo.data[prefix].value) || valueType.nC.key
        
        return (
            <div
                className="logic-pick-update menu-onclick"
                menu-type={dropdownType}
                page-key={pageInfo.pageKey}
                index-key={item}
                field-key={field}
                subfield-key={prefix}
                current-value={value}
                style={{
                    marginLeft: 'auto',
                    width: 18,
                    textAlign: 'center',
                }}
            >
                {this._renderItem(value)}
            </div>
        )
    }
}

export default LogicPickUpdate