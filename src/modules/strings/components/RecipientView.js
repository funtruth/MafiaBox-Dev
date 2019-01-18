import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

class RecipientView extends React.Component {
    render() {
        const { attach, selectedKey } = this.props
        const selectedItem = (attach.value && attach.value[selectedKey]) || {}
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
                }}
            >
                {!exclusive && <div
                    className="cute-button app-onclick"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        selectionType: 'showTo'
                    })}
                    style={{
                        color: '#a6a6a6',
                        fontSize: 13,
                    }}
                >
                    everyone
                </div>}
                {exclusive && <div
                    className="cute-button app-onclick"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        selectionType: 'showTo'
                    })}
                    style={{
                        color: '#a6a6a6',
                        fontSize: 13,
                    }}
                >
                    {Object.keys(showTo).filter(i => showTo[i]).join(', ')}
                </div>}
                {!exclusive && <div
                    className="cute-button app-onclick"
                    empty="true"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        selectionType: 'hideFrom'
                    })}
                    style={{
                        marginLeft: 6,
                    }}
                >
                    except
                </div>}
                {exclusive && <div
                    className="cute-button app-onclick"
                    empty="true"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        selectionType: 'showTo'
                    })}
                    style={{
                        marginLeft: 6,
                    }}
                >
                    and
                </div>}
                {inclusive && <div
                    className="cute-button app-onclick"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        selectionType: 'hideFrom'
                    })}
                    style={{
                        color: '#a6a6a6',
                        fontSize: 13,
                        marginLeft: 6,
                    }}
                >
                    {Object.keys(hideFrom).filter(i => hideFrom[i]).join(', ')}
                </div>}
            </div>
        )
    }
}

export default connect(
    null,
    {
        
    }
)(RecipientView)