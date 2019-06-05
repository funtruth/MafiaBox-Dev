import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    gameChoiceType,
} from '../../common/types';

import {
    Body,
    DropClick,
    Icon,
    LogicButton,
    Row,
    Tag,
} from '../../components/Common'

export default function GameChoiceField(props) {
    const { value, path } = props
    
    const renderItem = (item) => {
        const { title, prompt, gameChoice } = item

        const gameChoiceInfo = gameChoiceType[gameChoice] || {}

        return (
            <Row key={item.key} y="s" style={{marginBottom: 2}}>
                <DropClick
                    dropdown={dropdownType.pickGameChoiceType}
                    params={{
                        path: [...path, item.key],
                        currentValue: gameChoice,
                    }}
                >
                    <LogicButton
                        highlight={gameChoice ? 'whitish' : '#767676'}
                        color={gameChoice ? 'whitish' : 'grey'}
                    >
                        <Icon icon={`${gameChoiceInfo.icon || 'pencil'}`}></Icon>
                    </LogicButton>
                </DropClick>
                <Body>
                    <div className="row">
                        <DropClick
                            dropdown={dropdownType.writeGameChoice}
                            params={{
                                path: [...path, item.key, 'title'],
                                currentValue: title,
                                placeholder: 'Name your choice ...',
                            }}
                        >
                            <LogicButton>{title}</LogicButton> 
                        </DropClick>
                        <DropClick
                            dropdown={dropdownType.writeGameChoice}
                            params={{
                                path: [...path, item.key, 'prompt'],
                                currentValue: prompt,
                                placeholder: 'write a short description ...',
                            }}
                        >
                            <LogicButton color={prompt ? 'whitish' : 'grey'}>
                                {prompt || 'write a short description ...'}
                            </LogicButton> 
                        </DropClick>
                    </div>
                    {renderDetail(item)}
                </Body>
            </Row>
        )
    }

    const renderDetail = (item) => {
        const { key, gameChoice, value, display } = item

        switch(gameChoice) {
            case gameChoiceType.value.key:
                return (
                    <Row y="c" style={{marginTop: 2}}>
                        <LogicButton highlight="pink" color="grey">
                            choice
                        </LogicButton>
                        <Icon icon="chevron-right" color="whitish" size="l"></Icon>
                        <DropClick
                            dropdown={dropdownType.pickGlobalVar}
                            params={{
                                updateBy: 'field',
                                path: [...path, key],
                                currentValue: value,
                            }}
                        >
                            <LogicButton highlight="pink" color="grey">
                                value
                                <div className="logic-display" style={{color: value && "#ddd"}}>
                                    {display || '...'}
                                </div>
                            </LogicButton>
                        </DropClick>
                    </Row>
                )
            default:
                return null;
        }
    }

    const items = _.toArray(value)
    return (
        <Body
            x="l"
            style = {{
                borderLeft: '1px dashed #666',
                paddingLeft: 2,
            }}
        >
            {items.map(renderItem)}
            <DropClick
                dropdown={dropdownType.createGameChoice}
                params={{
                    path,
                    attach: value,
                    placeholder: "Name the choice ...",
                }}
            >
                <Tag
                    icon="map-marker"
                    text="add choice"
                    bg="darkgrey"
                />
            </DropClick>
        </Body>
    )
}