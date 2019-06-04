import React from 'react'

import { parseType } from '../../logic/types';

import {
    separateVar,
    WILD_CHAR,
    START_CHAR,
} from '../../logic/proptool'

import {
    DropEmpty,
    DropItem,
    DropParent,
    DropTitle,
} from '../components/Common';

export default function CheckVar({
    slate,
}){
    const { parseBy } = slate

    if (parseBy !== parseType.variable) {
        return (
            <>
                <DropTitle>error</DropTitle>
                <DropEmpty text="this is not a variable"/>
            </>
        )
    }

    const fields = separateVar(slate.value)

    const renderItem = (field, index) => {
        if (field === WILD_CHAR || field.charAt(0) === START_CHAR) {
            return (
                <DropParent
                    key={field + index}
                    text={field}
                />
            )
        }

        return (
            <DropItem
                key={field + index}
                text={field}
            />
        )
    }

    return (
        <>
            <DropTitle>variable fields</DropTitle>
            {fields.map(renderItem)}
        </>
    )
}