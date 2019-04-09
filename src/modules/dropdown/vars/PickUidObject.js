import React from 'react'
import { connect } from 'react-redux'
import * as helpers from '../../common/helpers'
import _ from 'lodash'

import {
    variableType,
    VAR_DEFAULTS,
} from '../../logic/types'

import {
    VARTYPE_IS_UID_OBJ,
    VARTYPE_IS_RSS,
} from '../../common/arrows'
import {
    presentVariable,
} from '../../logic/proptool'

import {
    DropEmpty,
    DropItem,
    DropScroll,
    DropTitle,
} from '../components/Common'

/*accessed from
    LogicBlock -> logicType: 'operator', operatorType: 'forin' -> LogicPanel onClick
*/
function PickUidObject(props) {
    const { attach, subfieldKey, attachVar, updateRef } = props
    const selectedValue = attach[subfieldKey] || {}
        
    let handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            value: item.key,
            display: presentVariable(item.key),
            declare: {
                key: helpers.genUID('@uid_', attachVar, 'x'),
                variableTypes: [
                    variableType.uid.key,
                    variableType.string.key,
                ],
            },
        })
        props.showDropdown()
    }

    const renderItem = (item) => {
        const chosen = selectedValue.value === item.key

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                rightIcon="mdi mdi-check"
            >
                {item.key}
            </DropItem>
        )
    }

    const uidObjects = _.filter(attachVar, VARTYPE_IS_UID_OBJ)
    const rssUidObjects = _(updateRef).filter(VARTYPE_IS_RSS).filter(VARTYPE_IS_UID_OBJ).value()

    return (
        <>
            <DropTitle>UID Objects</DropTitle>
            <DropScroll>
                {uidObjects.map(renderItem)}
                <DropEmpty>no results found</DropEmpty>
            </DropScroll>
            <DropTitle>game values</DropTitle>
            <DropScroll>
                {rssUidObjects.map(renderItem)}
            </DropScroll>
        </>
    )
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    })
)(PickUidObject)