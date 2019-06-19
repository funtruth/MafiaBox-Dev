import React from 'react'
import _ from 'lodash'

import {
    dropdownType,
    gameChoiceType,
    variableType,
} from '../../common/types';

import {
    Body,
    DropClick,
    Icon,
    LogicButton,
    Row,
    Tag,
} from '../../components/Common'
import LogicView from '../../logic/LogicView';

export default function GameChoiceField({ value, path, askForPhase }) {
    const renderItem = (item) => {
        const { title, prompt, phase, type } = item

        const gameChoiceInfo = gameChoiceType[type] || {}

        return (
            <Row key={item.key} y="t">
                <DropClick
                    dropdown={dropdownType.pickGameChoiceType}
                    params={{
                        path: [...path, item.key],
                    }}
                >
                    <LogicButton
                        highlight={type ? 'whitish' : '#767676'}
                        color={type ? 'whitish' : 'grey'}
                        icon={gameChoiceInfo.icon || 'pencil'}
                    />
                </DropClick>
                <Body x="l">
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
                    {askForPhase &&
                        <DropClick
                            dropdown={dropdownType.pickVarWithType}
                            params={{
                                path: [...path, item.key, 'phase'],
                                baseVar: {variableTypes: [variableType.key.key]}
                            }}
                        >
                            <LogicButton
                                text={phase && phase.display}
                                placeholder="pick a phase ..."
                            />
                        </DropClick>
                    }
                    {renderDetail(item)}
                    <LogicView path={[...path, item.key, 'logic']}/>
                </Body>
            </Row>
        )
    }

    const renderDetail = (item) => {
        const { key, type, value } = item
        const choicePath = [...path, key, 'value']

        switch(type) {
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
            case gameChoiceType.ordered.key:
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
                                label={type}
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