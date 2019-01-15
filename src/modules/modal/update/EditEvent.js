import React from 'react'

import { triggerNewVars } from '../../logic/types'
import { boardType } from '../../board/types'

import SearchBoard from '../../dropdown/update/SearchBoard';

class EditEvent extends React.Component {
    _onSave = () => {
        this.props.onSave()
        this.props.popModalBy(1)
    }
    
    render() {
        const { pageKey, fieldKey, indexKey, subfieldKey, attach, attachVar } = this.props
        
        const data = attach && attach.value
        const iprops = {
            indexKey,
            logicInfo: {
                data,
            },
            pageKey,
            fieldKey,
            subfieldKey,
            vars: {
                ...attachVar,
                ...triggerNewVars,
            },
        }
        
        return (
            <div cancel-appclick="true">
                <div style={{ padding: 16 }}>
                    <div className="modal-title">
                        Edit Events
                    </div>
                    <div className="row">
                        <div style={{ marginRight: 16 }}>
                            <SearchBoard {...this.props} boardType={boardType.strings}/>
                        </div>
                        <input/>
                    </div>
                </div>
                <div className="row dark-grey modal-options">
                    <div className="underline-button" onClick={this.props.onClose}>
                        Cancel
                    </div>
                    <div className="modal-button" onClick={this._onSave}>
                        Done
                    </div>
                </div>
            </div>
        )
    }
}

export default EditEvent