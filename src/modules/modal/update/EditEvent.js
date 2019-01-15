import React from 'react'

import { boardType } from '../../board/types'

import SearchBoard from '../../dropdown/update/SearchBoard';

class EditEvent extends React.Component {
    _onSave = () => {
        this.props.onSave()
        this.props.popModalBy(1)
    }
    
    render() {
        return (
            <div
                cancel-appclick="true"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <div
                    className="row"
                    style={{
                        minWidth: 600,
                        width: '75vw',
                        minHeight: 400,
                        height: '60vh',
                    }}
                >
                    <div>
                        <div className="modal-title">
                            Edit Events
                        </div>
                        <SearchBoard {...this.props} boardType={boardType.strings}/>
                    </div>
                    <textarea
                        style={{
                            resize: 'none',
                            height: '30%',
                            width: '100%',
                        }}
                    />
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