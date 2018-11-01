import React from 'react'
import { connect } from 'react-redux'

import { updateRoleInfo } from '../LibraryReducer'

class InputItem extends React.Component{
    _onChange = e => {
        this.props.updateRoleInfo(this.props.name, e.target.value)
    }

    render() {
        return (
            <div style={styles.item}>
                <div style={styles.text}>
                    {this.props.label}
                </div>
                <input
                    className="add-role-input"
                    placeholder={this.props.placeholder}
                    type="text"
                    onInput={this._onChange}
                />
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
    }
}

export default connect(
    null,
    {
        updateRoleInfo,
    }
)(InputItem)