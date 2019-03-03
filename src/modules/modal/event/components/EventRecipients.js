import React from 'react'

import { dropdownType, StatefulSourceId } from '../../../dropdown/types'

export default function EventRecipients(props) {
    const { workspace } = props
    const { value, selectedKey } = workspace
    const selectedItem = (value && value[selectedKey]) || {}
    const { showTo, hideFrom } = selectedItem

    //showing only to selected uid's
    const exclusive = Object.keys(showTo || {}).length > 0
    const inclusive = Object.keys(hideFrom || {}).length > 0
    
    return (
        <div
            className="row-nowrap"
            style={{
                padding: '0px 10px',
                alignItems: 'center',
                color: '#a6a6a6',
            }}
        >
            {!exclusive && <div
                className="cute-button app-onclick"
                menu-type={dropdownType.pickRecipient}
                stateful-source={StatefulSourceId.editEvent}
                app-onclick-props={JSON.stringify({
                    selectionType: 'showTo',
                    selectedKey,
                    statefulPath: ['value', selectedKey],
                })}
            >
                everyone
            </div>}
            {exclusive && <div
                className="cute-button app-onclick"
                menu-type={dropdownType.pickRecipient}
                stateful-source={StatefulSourceId.editEvent}
                app-onclick-props={JSON.stringify({
                    selectionType: 'showTo',
                    selectedKey,
                    statefulPath: ['value', selectedKey],
                })}
            >
                {Object.keys(showTo).filter(i => showTo[i]).join(', ')}
            </div>}
            {!exclusive && <div
                className="row cute-button app-onclick"
                empty="true"
                menu-type={dropdownType.pickRecipient}
                stateful-source={StatefulSourceId.editEvent}
                app-onclick-props={JSON.stringify({
                    selectionType: 'hideFrom',
                    selectedKey,
                    statefulPath: ['value', selectedKey],
                })}
                style={{
                    marginLeft: 6,
                }}
            >
                except
                {inclusive && <div style={{ marginLeft: 6, color: '#a6a6a6',  }}>
                    {Object.keys(hideFrom).filter(i => hideFrom[i]).join(', ')}
                </div>}
            </div>}
        </div>
    )
}