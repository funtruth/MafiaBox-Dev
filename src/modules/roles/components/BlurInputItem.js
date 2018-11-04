import React from 'react'
import { connect } from 'react-redux'

class BlurInputItem extends React.Component{
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

    render() {
        return (
            <div style={styles.item}>
                <div style={styles.text}>
                    {this.props.label}
                </div>
                <div className="blur-item">
                    {this.state.value}
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
    }
}

export default connect(
    state => ({
        roleInfoWorkspace: state.roles.roleInfoWorkspace,
    }),
)(BlurInputItem)