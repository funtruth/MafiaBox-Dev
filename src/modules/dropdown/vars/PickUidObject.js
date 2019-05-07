import React from 'react'
import _ from 'lodash'

import {
    variableType,
} from '../../common/types'
import {
    VAR_DEFAULTS,
    rssMap,
} from '../../common/defaults'

import {
    VARTYPE_IS_UID_OBJ,
} from '../../common/arrows'
import {
    parseJS,
    START_CHAR,
    END_CHAR,
} from '../../logic/proptool'
import * as helpers from '../../common/helpers'

import {
    DropEmpty,
    DropItem,
    DropScroll,
    DropTitle,
} from '../components/Common'

/*accessed from
    LogicBlock -> logicType: 'operator', operatorType: 'forin' -> LogicPanel onClick
*/
export default function PickUidObject(props) {
    const { attach, attachVar } = props
    const { source, variableName } = attach
        
    let handleSelect = (item) => {
        //if variable has already been set, keep the same variable
        const newName = variableName || helpers.genUID(START_CHAR + 'uid_', attachVar, 'x' + END_CHAR)

        props.updatePage({
            declare: {
                [newName]: {
                    ...VAR_DEFAULTS,
                    value: newName,
                    display: parseJS(newName),
                    variableTypes: [
                        variableType.uid.key,
                        variableType.string.key,
                    ],
                    static: true,
                }
            },
            data: {
                variableName: newName,
                source: item.key,
                display: parseJS(item.key),
            },
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = source === item.key

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                rightCheck
                text={item.key}
            />
        )
    }

    const uidObjects = _.filter(attachVar, VARTYPE_IS_UID_OBJ)
    const rssUidObjects = _(rssMap).filter(i => i.fieldLength === 2).filter(VARTYPE_IS_UID_OBJ).value()

    return (
        <>
            <DropTitle>UID Objects</DropTitle>
            <DropScroll>
                {uidObjects.map(renderItem)}
                <DropEmpty list={uidObjects} text="no results found"/>
            </DropScroll>
            <DropTitle>game values</DropTitle>
            <DropScroll>
                {rssUidObjects.map(renderItem)}
            </DropScroll>
        </>
    )
}