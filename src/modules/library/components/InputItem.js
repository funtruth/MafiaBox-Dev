import React from 'react'
import { connect } from 'react-redux'

import { updateRoleInfo } from '../LibraryReducer'

class InputItem extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            value: props.roleInfoWorkspace && (props.roleInfoWorkspace[props.name] || ''),
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            value: newProps.roleInfoWorkspace[this.props.name] || ''
        })
    }

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
                    value={this.state.value}
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
    state => ({
        roleInfoWorkspace: state.library.roleInfoWorkspace,
    }),
    {
        updateRoleInfo,
    }
)(InputItem)