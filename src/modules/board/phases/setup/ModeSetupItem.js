import React from 'react'

import { useOverflow } from '../../../hooks/Hooks'

import {
    Bubble,
} from '../../../components/Common'

export default function ModeSetupItem(props) {
    const { row, title, onDraft } = props

    const [overflowRef, overflowed] = useOverflow(null)
    
    return (
        <div ref={overflowRef}>
            <Bubble
                bg="blue"
                icon="mdi mdi-file-document-outline"
                onClick={() => onDraft(row)}
                style={{
                    float: overflowed ? 'none' : 'left',
                }}
            >
                {title}
            </Bubble>
        </div>
    )
}