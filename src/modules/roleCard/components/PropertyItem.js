import React from 'react'
import LabelWithEdit from './LabelWithEdit';

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
        const { field } = this.props
        this.props.updateRoleInfo(field, key)
    }

    render() {
        const { label, data } = this.props
        if (!data) return null
        
        return (
            <div className="field-wrapper">
                <LabelWithEdit label={label}/>
                <div className="row">
                    {data.map(this._renderItem)}
                </div>
            </div>
        )
    }
}

export default PropertyItem