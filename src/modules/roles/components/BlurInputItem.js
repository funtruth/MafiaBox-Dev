import React from 'react'

class BlurInputItem extends React.Component{
    render() {
        return (
            <div style={styles.item}>
                <div style={styles.text}>
                    {this.props.label}
                </div>
                <div className="blur-item">
                    {this.props.value}
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

export default BlurInputItem