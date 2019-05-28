import React, { useState } from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types';

import {
    separateField,
    combineFields,
    parseJS,
    WILD_CHAR,
} from '../../logic/proptool';

import {
    DropParent,
    DropTitle,
} from '../components/Common';
import {
    Tag,
} from '../../components/Common';
import RelatedVars from './RelatedVars'

function Underline() {
    return (
        <div
            style={{
                position: 'absolute',
                left: 0, right: 0,
                bottom: 0,
                height: 3,
                backgroundColor: '#fed766',
            }}
        ></div>
    )
}

export default function ReplaceWildcard(props) {
    const { currentValue, otherDropdown } = props
    const { value, wildcardValue } = currentValue

    const [target, setTarget] = useState('')
    const [fields, setFields] = useState(separateField(value))
    const [wildfields] = useState(separateField(wildcardValue))

    //TODO do some recursive thing here to deal with wildcards inside wildcards ...
    const renderField = (field, index) => {
        const selected = target === index

        if (field === WILD_CHAR) {
            return (
                <Tag
                    key={index}
                    bg="maroon"
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
                    {selected && <Underline/>}
                </Tag>
            )
        }

        if(wildfields[index] === WILD_CHAR) {
            return (
                <Tag
                    key={index}
                    bg="violet"
                    onClick={() => setTarget(index)}
                    style={{
                        position: 'relative',
                    }}
                >
                    {field}
                    {selected && <Underline/>}
                </Tag>
            )
        }

        return (
            <Tag key={index} bg="grey">
                {field}
            </Tag>
        )
    }

    const handleSelect = (item) => {
        //TODO add an error if no target selected
        if (target === '') {
            return;
        }

        //deep clone
        const fieldsClone = _.cloneDeep(fields)

        //make change
        fieldsClone[target] = item.key

        //re-assemble the string & update
        const combined = combineFields(fieldsClone)
        props.updatePage({
            value: combined,
            display: parseJS(combined),
        })

        //refresh the front-end of dropdown
        setFields(fieldsClone)
    }

    return (
        <>
            <DropTitle>replace field</DropTitle>
            <div className="row" style={{justifyContent: 'center', padding: '0px 15px'}}>
                {fields.map(renderField)}
            </div>
            <RelatedVars
                {...props}
                variableTypes={variableType.uid.key}
                onClick={handleSelect}
            />
            <DropTitle>other</DropTitle>
            <DropParent
                {...props}
                dropdownType={otherDropdown}
                text="values ..."
            />
        </>
    )
}