import React from 'react'
import { fieldIcon } from '../../fields/defaults'
import AddNewField from './AddNewField'

class ExpertTagField extends React.Component{
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

    render() {
        const { fieldInfo, field, data } = this.props
        if (!data) return null
        
        return (
            <div className="row" style={{ marginBottom: 4 }}>
                <div className="page-field-label">
                    <i className={`story-option ${fieldIcon.tag}`} style={{ width: 16 }}></i>
                    {(fieldInfo && fieldInfo.fieldTitle) || field}
                </div>
                <div>
                    <div className="row">
                        <div style={styles.label}>Destination</div>
                        {fieldInfo.data.map(this._renderItem)}
                    </div>
                    <div className="row">
                        <div style={styles.label}>Trigger</div>
                        {fieldInfo.data.map(this._renderItem)}
                    </div>
                    <AddNewField/>
                </div>
            </div>
        )
    }
}

const styles = {
    label: {
        font: '500 14px Arial',
        color: '#969696',
        margin: '0px 10px',
        display: 'flex',
        alignItems: 'center',
    }
}

export default ExpertTagField