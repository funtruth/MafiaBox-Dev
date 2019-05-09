import React from 'react'

import {
    Body,
    Row,
    Text,
} from '../../../../components/Common';
import RolePickerResult from './RolePickerResult'

export default function RolePickerResultView(props) {
    const { item, modeKey, draftInfo } = props
    const { data, title } = item
    
    return (
        <Row y="c">
            <Text size="s" style={{marginRight: 8}}>{title}</Text>
            {data.map(item => (
                <RolePickerResult
                    key={item.pageKey}
                    item={item}
                    modeKey={modeKey}
                    draftInfo={draftInfo}
                />
            ))}
        </Row>
    )
}