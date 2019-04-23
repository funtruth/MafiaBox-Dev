import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../../dropdown/types';

import {
    DropClick,
    Tag,
} from '../../components/Common';

export default function GeneralTagField(props) {
    const { path, fieldKey, fieldInfo, value, data } = props
    const { defaultValue } = fieldInfo

    let handleClick = (item, active) => props.updatePage(path, {[item.key]: !active})

    const renderItem = (item) => {
        const active = value && value[item.key]
                
        return (
            <DropClick
                key={item.key}
                onClick={() => handleClick(item, active)}
                rightDropdown={dropdownType.editGeneralTag}
                params={{
                    path: [fieldKey],
                    subfieldKey: item.key,
                    defaultValue,
                }}
            >
                <Tag theme={active ? 'purple' : 'black'}>
                    {item.title}
                </Tag>
            </DropClick>
        )
    }
    
    const tags = _(data).filter().sortBy(i => i.index).value()
    return (
        <div className="row">
            {tags.map(renderItem)}
            <DropClick
                dropdown={dropdownType.createGeneralTag}
                params={{
                    path: [fieldKey],
                    attach: data,
                    placeholder: "Tag name ...",
                }}
            >
                <Tag theme="darkgrey">new tag</Tag>
            </DropClick>
        </div>
    )
}