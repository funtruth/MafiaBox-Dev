import React from 'react'

import { dropdownType } from '../../../dropdown/types'

export default function EventRecipients(props) {
    const { workspace, selectedEvent, eventIndex, updateSource, path, subpath } = props
    const { showTo, hideFrom } = selectedEvent

    //showing only to selected uid's
    const exclusive = Object.keys(showTo || {}).length > 0
    const inclusive = Object.keys(hideFrom || {}).length > 0
    
    return (
        <div
            style={{
                padding: '0px 10px',
                color: '#a6a6a6',
            }}
        >
            <div className="dashboard-section-title">Recipients</div>
            <div className="row">
                {!exclusive && <div
                    className="cute-button app-onclick"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        attach: workspace,
                        selectionType: 'showTo',
                        eventIndex,
                        updateSource,
                        path,
                        subpath,
                    })}
                >
                    everyone
                </div>}
                {exclusive && <div
                    className="cute-button app-onclick"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        attach: workspace,
                        selectionType: 'showTo',
                        eventIndex,
                        updateSource,
                        path,
                        subpath,
                    })}
                >
                    {Object.keys(showTo).filter(i => showTo[i]).join(', ')}
                </div>}
                {!exclusive && <div
                    className="row cute-button app-onclick"
                    empty="true"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        attach: workspace,
                        selectionType: 'hideFrom',
                        eventIndex,
                        updateSource,
                        path,
                        subpath,
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
        </div>
    )
}