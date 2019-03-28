import React from 'react'
import _ from 'lodash'

import { logicType } from '../../logic/types'

import DropParent from '../components/DropParent'
import DropTitle from '../components/DropTitle';

export default function PickLogic(props) {
    const { attach } = props

    //Normal logic cannot have Internal Logic apart from Operator Logic
    let handleSelect = (item) => {
        props.updatePage({
            logicType: item.key,
            operatorType: '',
            data: '',
            right: '',
        })
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