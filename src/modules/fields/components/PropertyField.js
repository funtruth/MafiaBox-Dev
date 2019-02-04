import React from 'react'
import _ from 'lodash'

class PropertyField extends React.Component{
    _renderItem = (item) => {
        const { value, fieldKey } = this.props
        
        //todo i think this is wrong
        const active = fieldKey && value && value[item.key]
        
        return (
            <div
                key={item.key}
                className="property-button"
                style={{
                    backgroundColor: active ? (item.color || 'hsla(0,0%,100%,.1)') : 'rgba(40, 43, 48,1)',
                }}
                onClick={this._onClick.bind(this, item.key)}
            >
                {item.title}
            </div>
        )
    }

    _onClick = tagKey => {
        const { fieldKey, value } = this.props

        let dataClone = Object.assign({}, value)
        dataClone[tagKey] = !dataClone[tagKey]

        this.props.updatePage(fieldKey, dataClone)
    }

    render() {
        const { data } = this.props
        if (!data) return null

        const tags = _.sortBy(data, i => i.index)
        
        return (
            <div className="row">
                {tags.map(this._renderItem)}
            </div>
        )
    }
}

export default PropertyField