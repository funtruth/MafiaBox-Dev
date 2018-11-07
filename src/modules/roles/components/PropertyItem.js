import React from 'react'

class PropertyItem extends React.Component{
    _renderItem = (item) => {
        const { value, field } = this.props
        const active = field && item.key === value
        const style = {
            backgroundColor: active ? (item.color || 'rgba(40, 43, 48,1)') : 'hsla(0,0%,100%,.1)',
        }
        return (
            <div key={item.key} className="property-button" style={style} onClick={this._onClick.bind(this, item.key)}>
                {item.label}
            </div>
        )
    }

    _onClick = key => {
        const { roleId, field } = this.props
        this.props.updateRoleInfo(roleId, field, key)
    }

    render() {
        const { label, data } = this.props
        if (!data) return null
        
        return (
            <div style={styles.item}>
                <div style={styles.text}>
                    {label}
                </div>
                <div className="row">
                    {data.map(this._renderItem)}
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

export default PropertyItem