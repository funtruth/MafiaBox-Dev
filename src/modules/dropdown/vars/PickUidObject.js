import React from 'react'
import _ from 'lodash'

import {
    variableType,
} from '../../common/types'
import {
    LOGIC_ITEM_VAR,
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
import generatePushID from '../../common/generatePushID';

import {
    DropEmpty,
    DropItem,
    DropScroll,
    DropTitle,
} from '../components/Common'

/*accessed from
    LogicItem -> logicType: 'operator', operatorType: 'forin' -> LogicPanel onClick
*/
export default function PickUidObject({
    slate,
    scopedVars,
    updateGeneral,
    showDropdown,
}) {
    const { source, variableName } = slate
        
    let handleSelect = (item) => {
        //if variable has already been set, keep the same variable
        const newName = variableName || generatePushID(START_CHAR + 'uid', END_CHAR)

        updateGeneral({
            declare: {
                [newName]: {
                    ...LOGIC_ITEM_VAR,
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
        showDropdown();
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

    const uidObjects = _.filter(scopedVars, VARTYPE_IS_UID_OBJ)
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