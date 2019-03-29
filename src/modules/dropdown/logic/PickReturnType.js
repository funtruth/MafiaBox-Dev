import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { returnType } from '../../logic/types'
import { modalType } from '../../modal/types';

import { showModal } from '../../modal/ModalReducer'

import {
    DropItem,
    DropTitle,
 } from '../components/Common';

function PickReturnType(props) {
    const { attach } = props
    const toastChosen = attach.key === 'toast'

    const renderItem = (item) => {
        const chosen = item.key === attach.key

        return (
            <DropItem
                key={item.key}
                chosen={chosen}
                onClick={() => handleSelect(item)}
                leftIcon={item.icon}
                rightIcon="mdi mdi-check"
            >
                {item.title}
            </DropItem>
        )
    }

    const handleSelect = (item) => {
        props.updatePage({
            key: item.key,
            string: '',
        })
        props.showDropdown()
    }

    const onToast = () => {
        props.showModal(modalType.editToast, {
            attach: attach || {},
        })
        props.showDropdown()
    }

    const data = _.orderBy(returnType, i => i.index)

    return (
        <>
            <DropTitle>return types</DropTitle>
            {data.map(renderItem)}
            <DropTitle>other</DropTitle>
            <DropItem
                chosen={toastChosen}
                onClick={onToast}
                leftIcon="mdi mdi-comment-processing"
                rightIcon="mdi mdi-check"
            >
                toaster
            </DropItem>
        </>
    )
}

export default connect(
    null,
    {
        showModal,
    }
)(PickReturnType)