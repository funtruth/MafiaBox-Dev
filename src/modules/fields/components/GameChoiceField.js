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

export default function GameChoiceField({ value, path }) {
    const renderItem = (item) => {
        const { title, prompt, gameChoice } = item

        const gameChoiceInfo = gameChoiceType[gameChoice] || {}

        return (
            <Row key={item.key} y="t">
                <DropClick
                    dropdown={dropdownType.pickGameChoiceType}
                    params={{
                        path: [...path, item.key],
                    }}
                >
                    <LogicButton
                        highlight={gameChoice ? 'whitish' : '#767676'}
                        color={gameChoice ? 'whitish' : 'grey'}
                        icon={gameChoiceInfo.icon || 'pencil'}
                    />
                </DropClick>
                <Body>
                    <Row>
                        <DropClick
                            dropdown={dropdownType.dropString}
                            params={{
                                path: [...path, item.key, 'title'],
                                placeholder: 'Name your choice ...',
                            }}
                        >
                            <LogicButton text={title}/> 
                        </DropClick>
                        <DropClick
                            dropdown={dropdownType.dropString}
                            params={{
                                path: [...path, item.key, 'prompt'],
                                placeholder: 'write a short description ...',
                            }}
                        >
                            <LogicButton
                                text={prompt}
                                placeholder="write a short description ..."
                            />
                        </DropClick>
                    </Row>
                    {renderDetail(item)}
                </Body>
            </Row>
        )
    }

    const renderDetail = (item) => {
        const { key, gameChoice, value } = item
        const choicePath = [...path, key, 'value']

        switch(gameChoice) {
            case gameChoiceType.value.key:
                return (
                    <Row>
                        <LogicButton highlight="pink" color="grey">
                            choice
                        </LogicButton>
                        <Icon icon="chevron-right" color="whitish" size="l"></Icon>
                        <DropClick
                            dropdown={dropdownType.pickGlobalVar}
                            params={{
                                formatAsVariable: false,
                                path: choicePath,
                            }}
                        >
                            <LogicButton
                                highlight="pink"
                                label="value"
                                text={value}
                                placeholder="..."
                            />
                        </DropClick>
                    </Row>
                )
            case gameChoiceType.multi.key:
                return (
                    <Row>
                        <LogicButton highlight="pink" color="grey">
                            choice
                        </LogicButton>
                        <Icon icon="chevron-right" color="whitish" size="l"></Icon>
                        <DropClick
                            dropdown={dropdownType.dropNumber}
                            params={{
                                path: choicePath,
                            }}
                        >
                            <LogicButton
                                highlight="pink"
                                label="multi"
                                text={value}
                                placeholder="..."
                            />
                        </DropClick>
                    </Row>
                )
            case gameChoiceType.ordered.key:
                return (
                    <Row>
                        <LogicButton highlight="pink" color="grey">
                            choice
                        </LogicButton>
                        <Icon icon="chevron-right" color="whitish" size="l"></Icon>
                        <DropClick
                            dropdown={dropdownType.gameChoiceOrdered}
                            params={{
                                path: choicePath,
                            }}
                        >
                            <LogicButton
                                highlight="pink"
                                label="ordered"
                                text={value}
                                placeholder="..."
                            />
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
                    placeholder: "Name the choice ...",
                }}
            >
                <Tag
                    icon="map-marker"
                    text="add choice"
                />
            </DropClick>
        </Body>
    )
}