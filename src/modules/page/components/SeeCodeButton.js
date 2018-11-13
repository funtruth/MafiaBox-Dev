import React from 'react'

class SeeCodeButton extends React.Component {
    render() {
        return (
            <div className="see-code-button" onClick={this.props.onClick}>
                <i className="ion-md-code-working" style={styles.icon}></i>
                Raw Code
            </div>
        )
    }
}

const styles = {
    icon: {
        padding: '0px 0px',
        borderRadius: 4,
        fontSize: 22,
        marginRight: 5,
    }
}

export default SeeCodeButton