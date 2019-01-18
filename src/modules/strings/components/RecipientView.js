import React from 'react'
import { connect } from 'react-redux'

import { dropdownType } from '../../dropdown/types'

class RecipientView extends React.Component {
    render() {
        const { attach, selectedKey } = this.props
        const selectedItem = (attach.value && attach.value[selectedKey]) || {}
        const { showTo, hideFrom } = selectedItem

        //looking at showTo and hideFrom

        return (
            <div
                className="row-nowrap"
                style={{
                    padding: '0px 10px',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        padding: '6px 8px 6px 20px',
                        font: '500 13px Arial',
                        color: '#969696',
                    }}
                >
                    Show event to ...
                </div>
                {!showTo && <div
                    className="cute-button app-onclick"
                    menu-type={dropdownType.pickRecipient}
                    style={{
                        color: '#a6a6a6',
                        fontSize: 13,
                    }}
                >
                    everyone
                </div>}
                {!showTo && <div
                    className="cute-button app-onclick"
                    empty="true"
                    menu-type={dropdownType.pickRecipient}
                    app-onclick-props={JSON.stringify({
                        hideToEveryone: true,
                    })}
                    style={{
                        marginLeft: 6,
                    }}
                >
                    except
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