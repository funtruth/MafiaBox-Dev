import React from 'react'

import { dropdownType } from '../../../dropdown/types'

import { DropClick, Row, Text, Tag } from '../../../components/Common';
import { usePath } from '../../../hooks/Hooks';

export default function EditEventHeader(props) {
    const { path } = props
    const slate = usePath(path)

    const { display, showTo, hideFrom } = slate

    //showing only to selected uid's
    const exclusive = Object.keys(showTo || {}).length > 0
    const inclusive = Object.keys(hideFrom || {}).length > 0
    
    return (
        <Row>
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
            <Text>Recipients</Text>
            <Row>
                {!exclusive &&
                    <DropClick
                        className="cute-button"
                        dropdown={dropdownType.pickRecipient}
                        params={{
                            path: [...path, 'showTo'],
                        }}
                    >
                        everyone
                    </DropClick>
                }
                {exclusive &&
                    <DropClick
                        className="cute-button"
                        dropdown={dropdownType.pickRecipient}
                        params={{
                            path: [...path, 'showTo'],
                        }}
                    >
                        {Object.keys(showTo).filter(i => showTo[i]).join(', ')}
                    </DropClick>
                }
                {!exclusive &&
                    <DropClick
                        className="row cute-button"
                        empty="true"
                        dropdown={dropdownType.pickRecipient}
                        params={{
                            path: [...path, 'hideFrom'],
                        }}
                        style={{
                            marginLeft: 6,
                        }}
                    >
                        except
                        {inclusive &&
                            <div style={{ marginLeft: 6, color: '#a6a6a6',  }}>
                                {Object.keys(hideFrom).filter(i => hideFrom[i]).join(', ')}
                            </div>
                        }
                    </DropClick>
                }
            </Row>
        </Row>
    )
}