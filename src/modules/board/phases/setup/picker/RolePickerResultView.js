import React from 'react'

import {
    Row,
    Text,
} from '../../../../components/Common';
import RolePickerResult from './RolePickerResult'

export default function RolePickerResultView(props) {
    const { item, path, draftInfo } = props
    const { data, title } = item

    return (
        <Row y="c">
            <Text size="s" style={{marginRight: 8}}>{title}</Text>
            {data.map(item => (
                <RolePickerResult
                    key={item.key}
                    item={item}
                    path={path}
                    draftInfo={draftInfo}
                />
            ))}
        </Row>
    )
}