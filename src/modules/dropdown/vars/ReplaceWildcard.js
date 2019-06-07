import React, { useState } from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types';
import { APP_SHADES } from '../../components/Standards';

import {
    parseJS,
    replaceVarWithMap,
    START_CHAR,
    WILD_CHAR,
    separateVar,
} from '../../logic/proptool';

import { DropTitle } from '../components/Common';
import {
    Tag, Row,
} from '../../components/Common';
import PickVarWithType from './PickVarWithType';

export default function ReplaceWildcard(props){
    const {
        path,
        slate,
        updateGeneral,
    } = props

    const [focusMap, setFocusMap] = useState([])

    const handleFocus = (e, map) => {
        e.stopPropagation();
        setFocusMap(map);
    }

    const renderField = (field, map = [], shade = 'discord') => {
        const fields = separateVar(field)

        return (
            fields.map((field, index) => {
                const thisMap = [...map, index]
                const chosen = _.isEqual(thisMap, focusMap)

                if (field.charAt(0) === START_CHAR) {
                    return (
                        <Tag 
                            key={field + index}
                            bg={chosen ? "purple" : APP_SHADES[shade]['f']}
                            onClick={(e) => handleFocus(e, thisMap)}
                        >
                            {renderField(field, thisMap, APP_SHADES[shade]['f'])}
                        </Tag>
                    )
                }

                const isWild = field === WILD_CHAR
                return (
                    <Tag
                        key={field + index}
                        bg={chosen ? "purple" : "charcoal"}
                        disabled={!isWild}
                        onClick={(e) => isWild && handleFocus(e, thisMap)}
                    >
                        {field}
                    </Tag>
                )
            })
        )
    }

    const handleSelect = (item) => {
        const newValue = replaceVarWithMap(item.value, slate.value, focusMap)
        updateGeneral({
            path,
            update: {
                value: newValue,
                display: parseJS(newValue),
            }
        });
    }

    return (
        <>
            <DropTitle>variable field</DropTitle>
            <Row y="c">
                {renderField(slate.value)}
            </Row>
            <PickVarWithType
                {...props}
                pickVarClick={handleSelect}
                baseVar={{
                    variableTypes: [variableType.uid.key],
                }}
            />
        </>
    )
}