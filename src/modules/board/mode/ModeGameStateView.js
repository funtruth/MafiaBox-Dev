import React from 'react'

import { dropdownType, variableType } from '../../common/types';

import { getSubfields, lastSubfield } from '../../logic/proptool';

import { DropClick, Body, Tag, Text, Row, Icon } from '../../components/Common';

export default function ModeGameStateView({
    path,
    slate
}){
    const gameState = slate.gameState || {}
    const fields = getSubfields('(rss)(gameState)')

    const renderItem = (item) => {
        const subfield = lastSubfield(item.value)

        return (
            <Row key={item.key} y="c">
                <Tag text={item.display}/>
                <DropClick
                    dropdown={dropdownType.pickVarType}
                    params={{
                        path: ['rssMap', item.key],
                    }}
                >
                    <Tag>
                        {item.variableTypes ?
                            item.variableTypes.map(type => type && <Icon key={type} icon={variableType[type].icon}/>)
                            :'...'
                        }
                    </Tag>
                </DropClick>
                <DropClick
                    dropdown={dropdownType.pickConstWithType}
                    params={{
                        baseVar: item,
                        path: [...path, 'gameState', subfield],
                    }}
                >
                    <Tag text={(gameState[subfield] && gameState[subfield].display) || '...'}/>
                </DropClick>
            </Row>
        )
    }

    return (
        <Body x="l">
            <Text>Initial game state</Text>
            {fields.map(renderItem)}
            <DropClick
                dropdown={dropdownType.addToRSSMap}
                params={{
                    prefix: '(rss)(gameState)',
                }}
            >
                <Tag
                    icon="key-plus"
                    text="add field"
                />
            </DropClick>
        </Body>
    )
}