import React from 'react'
import _ from 'lodash'

import { logicType } from '../../logic/types'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle';

export default function PickLogic(props) {
    const { attach } = props

    let handleSelect = (item) => {
        let update = {}
        
        update.logicType = item.key
        update.operatorType = ''

        switch(item.key) {
            case logicType.update.key:
            case logicType.return.key:
            case logicType.variable.key:
            case logicType.operator.key:
                update.data = {}
                break
            case logicType.function.key:
                update.data = ''
                break
            default:
        }
        
        props.updatePage(update)
        props.showDropdown()
    }

    let renderItem = (item) => {
        const chosen = item.key === attach.logicType

        if (item.dropdown) {
            return (
                <DropParent
                    {...props}
                    key={item.key}
                    chosen={chosen.toString()}
                    dropdownType={item.dropdown}
                    params={{
                        hoverKey: item.key,
                    }}
                    icon={item.icon}
                    text={item.key}
                    style={{
                        backgroundColor: chosen && item.color,
                    }}
                />
            )
        }

        return (
            <div
                key={item.key}
                className="drop-down-menu-option"
                chosen={chosen.toString()}
                onClick={() => handleSelect(item)}
                style={{
                    backgroundColor: chosen && item.color,
                }}
            >
                <i className={`${item.icon} drop-down-menu-icon`}/>
                {item.title}
                <i className="mdi mdi-check"/>
            </div>
        )
    }
    return (
        <>
            <DropTitle>logic types</DropTitle>
            {_.orderBy(logicType, i => i.index).map(renderItem)}
        </>
    )
}