import React from 'react'

import {
    Body,
    Tag,
} from '../../components/Common'

export default function GameChoiceField(props) {
    const { value } = props

    const renderItem = (choiceKey) => {
        return (
            <div>

            </div>
        )
    }

    const handleClick = () => {

    }
    
    return (
        <div className="logic-board">
            {Object.keys(value||{}).map(renderItem)}
            <Body size="s">
                <Tag theme="darkgrey" onClick={handleClick}>
                    add choice
                </Tag>
            </Body>
        </div>
    )
}