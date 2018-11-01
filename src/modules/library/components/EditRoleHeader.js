import React from 'react'
import { connect } from 'react-redux'

import { saveRoleInfo } from '../LibraryReducer'

class EditRoleHeader extends React.Component{
    _onClick = () => {
        this.props.saveRoleInfo()
    }

    render() {
        return (
            <div className="row" style={styles.item}>
                <div style={styles.saveButton} onClick={this._onClick}>
                    {'Save'}
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
    saveButton: {
        padding: '6px 12px',
        backgroundColor: '#039be5',
        borderRadius: 4,
        fontSize: 14,
        fontWeight: '500',
        fontFamily: 'Arial',
        color: '#fff',
        cursor: 'pointer',
    },
}

export default connect(
    null,
    {
        saveRoleInfo,
    }
)(EditRoleHeader)