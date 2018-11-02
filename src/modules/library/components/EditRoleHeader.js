import React from 'react'
import { connect } from 'react-redux'

import { saveRoleInfo } from '../LibraryReducer'

class EditRoleHeader extends React.Component{
    _onSave = () => {
        this.props.saveRoleInfo()
    }

    _onReset = () => {

    }

    _onDelete = () => {
        
    }

    render() {
        return (
            <div className="row" style={styles.item}>
                <div className="cute-button" style={{ marginLeft: 'auto', marginRight: 8 }} onClick={this._onSave}>
                    <i class="option-icon ion-ios-save"></i>
                    {'Save'}
                </div>
                <div className="cute-button" style={{ marginRight: 8 }} onClick={this._onReset}>
                    <i class="option-icon ion-md-refresh"></i>
                    {'Discard Changes'}
                </div>
                <div className="cute-button" onClick={this._onDelete}>
                    <i class="option-icon ion-ios-trash"></i>
                    {'Delete Role'}
                </div>
            </div>
        )
    }
}

const styles = {
    item: {
        padding: 4,
    },
    text: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
        fontFamily: 'Arial',
        color: '#f6f6f7',
    },
}

export default connect(
    null,
    {
        saveRoleInfo,
    }
)(EditRoleHeader)