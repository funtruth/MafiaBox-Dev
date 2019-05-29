import React from 'react'
import _ from 'lodash'

import { dropdownType } from '../../../dropdown/types'

import { usePath } from '../../../hooks/Hooks';

import { DropClick, Row, Tag, Text } from '../../../components/Common';

const glue = (obj) => Object.keys(obj).filter(i => obj[i]).join(', ')

export default function EditEventHeader(props) {
    const { path } = props
    const slate = usePath(path)

    const { display, showTo, hideFrom } = slate

    //showing only to selected uid's
    const exclusive = _.filter(showTo).length > 0
    const inclusive = _.filter(hideFrom).length > 0
    
    return (
        <Row>
            <Row style={{flex: 0.3}} y="c">
                <Text>Title</Text>
                <DropClick
                    dropdown={dropdownType.dropString}
                    params={{
                        path: [...path, 'display'],
                    }}
                >
                    <Tag>
                        {display || 'Untitled'}
                    </Tag>
                </DropClick>
            </Row>
            <Row style={{flex: 0.7}} y="c">
                <Text>Recipients</Text>
                {!exclusive &&
                    <DropClick
                        dropdown={dropdownType.pickRecipient}
                        params={{
                            selectionType: 'showTo',
                        }}
                    >
                        <Tag>
                            everyone
                        </Tag>
                    </DropClick>
                }
                {exclusive &&
                    <DropClick
                        dropdown={dropdownType.pickRecipient}
                        params={{
                            selectionType: 'showTo',
                        }}
                    >
                        <Tag>
                            {glue(showTo)}
                        </Tag>
                    </DropClick>
                }
                {!exclusive &&
                    <DropClick
                        dropdown={dropdownType.pickRecipient}
                        params={{
                            selectionType: 'hideFrom',
                        }}
                    >
                        <Tag>
                            {`except ${inclusive ? (' ' + glue(hideFrom)) : ''}`}
                        </Tag>
                    </DropClick>
                }
            </Row>
        </Row>
    )
}