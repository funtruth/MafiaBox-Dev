import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../../dropdown/types';

import {
    Body,
    DropClick,
    LogicButton,
    Tag,
} from '../../components/Common'

export default function GameChoiceField(props) {
    const { value, path } = props
    
    const renderItem = (item) => {
        return (
            <DropClick
                key={item.key}
                className="row"
                dropdown={dropdownType.pickGameChoiceType}
                params={{
                    path: [...path, item.key],
                }}
            >
                <LogicButton></LogicButton>
                <LogicButton>{item.title}</LogicButton> 
            </DropClick>
        )
    }

    const items = _.toArray(value)
    return (
        <Body>
            {items.map(renderItem)}
            <DropClick
                dropdown={dropdownType.createGameChoice}
                params={{
                    path,
                    attach: value,
                    placeholder: "Create choice ...",
                }}
            >
                <Tag theme="darkgrey">
                    add choice
                </Tag>
            </DropClick>
        </Body>
    )
}