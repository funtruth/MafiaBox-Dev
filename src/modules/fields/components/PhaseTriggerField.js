import React from 'react'
import { fieldIcon } from '../defaults'
import SeeCodeButton from '../../page/components/SeeCodeButton';

class PhaseTriggerField extends React.Component{
    _renderItem = (item) => {
        const { value, field } = this.props
        const active = field && item.key === value
        const style = {
            backgroundColor: active ? (item.color || 'hsla(0,0%,100%,.1)') : 'rgba(40, 43, 48,1)',
        }
        return (
            <div key={item.key} className="property-button" style={style} onClick={this._onClick.bind(this, item.key)}>
                {item.title}
            </div>
        )
    }

    _onClick = key => {
        const { field, pageInfo } = this.props
        this.props.updatePage(pageInfo.pageKey, field, key)
    }

    _showCode = () => {
        
    }

    render() {
        const { fieldInfo, field, data } = this.props
        if (!data) return null
        
        return (
            <div className="row field-item" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.phaseTrigger}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || field}
                </div>
                <div className="row-centered">
                    {fieldInfo.data.map(this._renderItem)}
                </div>
                <SeeCodeButton
                    onClick={this._showCode}
                />
            </div>
        )
    }
}

export default PhaseTriggerField