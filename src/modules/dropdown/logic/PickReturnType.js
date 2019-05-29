import React from 'react'
import _ from 'lodash'

import {
    modalType,
    returnType,
    variableType,
} from '../../common/types'
import {
    VAR_DEFAULTS,
} from '../../common/defaults'

import { usePath } from '../../hooks/Hooks';

import {
    DropItem,
    DropTitle,
 } from '../components/Common';

export default function PickReturnType(props) {
    const { path } = props
    const slate = usePath(path)

    const {
        key:    currentKey,
        string: toastString,
    } = slate

    const renderItem = (item) => {
        const chosen = item.key === currentKey

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightCheck
                text={item.title}
            />
        )
    }

    const handleSelect = (item) => {
        props.updatePage({
            ...VAR_DEFAULTS,
            key: item.key,
            display: item.key,
            string: toastString,
            variableTypes: [variableType.boolean.key],
        });
    }

    const onToast = () => {
        props.showModal(modalType.editToast, {
            path: [...path, 'string'],
        })
        props.showDropdown();
    }

    const data = _.orderBy(returnType, i => i.index)

    return (
        <>
            <DropTitle>return types</DropTitle>
            {data.map(renderItem)}
            <DropTitle>advanced</DropTitle>
            <DropItem
                chosen={!!toastString}
                onClick={onToast}
                leftIcon="mdi mdi-comment-processing"
                rightCheck
                text="show message"
            />
        </>
    )
}