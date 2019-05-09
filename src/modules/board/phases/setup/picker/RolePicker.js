import React, { useState } from 'react'

import {
    Body,
} from '../../../../components/Common'
import RolePickerHeader from './RolePickerHeader';

export default function RolePicker(props) {
    const { modeKey, draftInfo } = props

    const [tab, setTab] = useState(0)

    return (
        <Body
            className="--basic-slide"
            sizes={['xs', 'xs']}
        >
            <RolePickerHeader
                modeKey={modeKey}
                draftInfo={draftInfo}
            />
        </Body>
    )
}