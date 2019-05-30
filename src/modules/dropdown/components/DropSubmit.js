import React from 'react'

import { Icon, Tag } from '../../components/Common'

export default function DropSubmit(props) {
    const { onClick } = props
    
    return (
        <Tag onClick={onClick} style={{marginLeft: 9}}>
            <Icon icon="mdi mdi-check-underline"/>
        </Tag>
    )
}