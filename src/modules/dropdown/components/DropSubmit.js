import React from 'react'

import { Tag } from '../../components/Common'

export default function DropSubmit(props) {
    const { onClick } = props
    
    return (
        <Tag
            icon="check-underline"
            onClick={onClick}
            style={{marginLeft: 9}}
        />
    )
}