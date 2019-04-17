import React, { useState } from 'react'
import _ from 'lodash'

import {
    mathType,
    DEFAULT_ASSIGN,
} from '../../modal/vars/components/types';

import { VARTYPE_IS_UID } from '../../common/arrows'
import {
    separateField,
    WILD_CHAR,
} from '../../logic/proptool';

import {
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common';
import Tag from '../../components/Tag';

export default function ReplaceWildcard(props) {
    const [target, setTarget] = useState('')
    const [newFields, setNewFields] = useState(separateField(wildcardValue))

    const { currentValue, attachVar, otherDropdown } = props
    const { wildcardValue } = currentValue

    const fields = separateField(wildcardValue)
    const uids = _.filter(attachVar, VARTYPE_IS_UID)
    
    //TODO do some recursive thing here to deal with wildcards inside wildcards ...
    const renderField = (item, index) => {
        if (item === WILD_CHAR) {
            const selected = target === index
            return (
                <Tag
                    key={index}
                    theme="red"
                    onClick={() => setTarget(index)}
                    style={{
                        position: 'relative',
                    }}
                >
                    <i
                        className="mdi mdi-alert"
                        style={{
                            fontSize: 15,
                        }}
                    ></i>
                    {selected && 
                        <div
                            style={{
                                position: 'absolute',
                                left: 0, right: 0,
                                bottom: 0,
                                height: 4,
                                borderBottomLeftRadius: 2,
                                borderBottomRightRadius: 2,
                                backgroundColor: '#fed766',
                            }}
                        ></div>
                    }
                </Tag>
            )
        }

        return (
            <Tag key={index} theme="grey">
                {item}
            </Tag>
        )
    }

    const renderItem = (item) => {
        const chosen = false

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

    let handleSelect = (item) => {
        props.updatePage({
            ...DEFAULT_ASSIGN,
            mathType: mathType.value,
            value: item.key,
        })
        props.showDropdown()
    }

    return (
        <>
            <DropTitle>replace field</DropTitle>
            <div className="row" style={{justifyContent: 'center', padding: '0px 15px'}}>
                {fields.map(renderField)}
            </div>
            <DropTitle>uids</DropTitle>
            {uids.map(renderItem)}
            <DropTitle>other</DropTitle>
            <DropParent
                {...props}
                dropdownType={otherDropdown}
                text="values ..."
            />
        </>
    )
}