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
                    color: '#a6a6a6',
                }}
            >
                {!exclusive && <div
                    className="cute-button app-onclick"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        selectionType: 'showTo'
                    })}
                >
                    everyone
                </div>}
                {exclusive && <div
                    className="cute-button app-onclick"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        selectionType: 'showTo'
                    })}
                >
                    {Object.keys(showTo).filter(i => showTo[i]).join(', ')}
                </div>}
                {!exclusive && <div
                    className="row cute-button app-onclick"
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
                    {inclusive && <div style={{ marginLeft: 6, color: '#a6a6a6',  }}>
                        {Object.keys(hideFrom).filter(i => hideFrom[i]).join(', ')}
                    </div>}
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