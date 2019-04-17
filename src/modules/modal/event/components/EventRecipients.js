import React from 'react'

import { dropdownType } from '../../../dropdown/types'

import { DropClick } from '../../../components/Common';

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
                {!exclusive &&
                    <DropClick
                        className="cute-button"
                        dropdown={dropdownType.pickRecipient}
                        params={{
                            attach: workspace,
                            selectionType: 'showTo',
                            eventIndex,
                            updateSource,
                            path,
                            subpath,
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
                            attach: workspace,
                            selectionType: 'showTo',
                            eventIndex,
                            updateSource,
                            path,
                            subpath,
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
                            attach: workspace,
                            selectionType: 'hideFrom',
                            eventIndex,
                            updateSource,
                            path,
                            subpath,
                        }}
                        style={{
                            marginLeft: 6,
                        }}
                    >
                        except
                        {inclusive && <div style={{ marginLeft: 6, color: '#a6a6a6',  }}>
                            {Object.keys(hideFrom).filter(i => hideFrom[i]).join(', ')}
                        </div>}
                    </DropClick>
                }
            </div>
        </div>
    )
}