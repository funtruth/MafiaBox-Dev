import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../../dropdown/types';

import {
    DropClick,
    Tag,
} from '../../components/Common';

export default function UniqueTagField(props) {
    const { path, fieldKey, fieldInfo, value, data } = props
    const { readOnly, defaultValue } = fieldInfo

    const handleClick = (item) => props.updatePage(path, item.key)

    const renderItem = (item) => {
        const active = item.key === value

        return (
            <DropClick
                key={item.key}
                onClick={() => handleClick(item)}
                context={dropdownType.editUniqueTag}
                params={{
                    path: [fieldKey],
                    subfieldKey: item.key,
                    defaultValue,
                }}
            >
                <Tag
                    bg={active ? 'active' : 'blackish'}
                    icon={active ? 'check-underline' : ''}
                    text={item.title}
                />
            </DropClick>
        )
    }

    const tags = _(data).filter().sortBy(i => i.index).value()
    return (
        <div className="row">
            {tags.map(renderItem)}
            {!readOnly && 
                <DropClick
                    dropdown={dropdownType.createTag}
                    params={{
                        path: ['fieldRepo', fieldKey],
                        placeholder: "Team name ...",
                    }}
                >
                    <Tag bg="charcoal">add team</Tag>
                </DropClick>
            }
        </div>
    )
}