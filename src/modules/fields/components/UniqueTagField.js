import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../../dropdown/types';

import {
    Tag,
} from '../../components/Common';

export default function UniqueTagField(props) {
    const { path, fieldKey, value, data } = props
    
    const handleClick = (item) => props.updatePage(path, item.key)

    const renderItem = (item) => {
        const active = item.key === value

        return (
            <Tag
                key={item.key}
                theme={active ? 'yellow' : 'black'}
                onClick={() => handleClick(item)}
            >
                {item.title}
            </Tag>
        )
    }

    const tags = _.sortBy(data, i => i.index)
    return (
        <div className="row">
            {tags.map(renderItem)}
            <div
                className="app-onclick"
                menu-type={dropdownType.createUniqueTag}
                app-onclick-props={JSON.stringify({
                    path: [fieldKey],
                    attach: data,
                    placeholder: "Team name ...",
                })}
            >
                <Tag theme="darkgrey">add team</Tag>
            </div>
        </div>
    )
}