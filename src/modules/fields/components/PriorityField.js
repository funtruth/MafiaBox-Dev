import React from 'react'

import { modalType } from '../../common/types';

import { Body, DropClick, Tag } from '../../components/Common'

const formatNumber = (v) => {
    if (!v)         return 'not ordered'
    switch(v) {
        case 1:     return '1st'
        case 2:     return '2nd'
        case 3:     return '3rd'
        default:    return v + 'th'
    }
}

export default function PriorityField({value, path}) {
    return (
        <Body x="l">
            <DropClick
                modal={modalType.editPriority}
                params={{
                    path,
                }}
            >
                <Tag icon="format-list-numbered" text={formatNumber(value)}/>
            </DropClick>
        </Body>
    )
}