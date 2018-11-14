import React from 'react'
import { fieldIcon } from '../defaults'
import SeeCodeButton from '../../page/components/SeeCodeButton';

import { dropdownType } from '../../app/menu/types'

import {Controlled as CodeMirror} from 'react-codemirror2'
require('codemirror/mode/javascript/javascript')

class PhaseTriggerField extends React.Component{
    state = {
        value: ''
    }

    _renderItem = (item) => {
        const { value, field, pageInfo } = this.props

        const active = field && item.key === value
        const empty = item.key === 'empty'

        const style = {
            backgroundColor: empty ?
                null : active ? (item.color || 'hsla(0,0%,100%,.1)') : 'rgba(40, 43, 48,1)',
            color: empty && '#969696',
        }
        
        return (
            <div
                key={item.key}
                field-key={field}
                page-key={pageInfo.pageKey}
                className="property-button menu-onclick"
                style={style}
                menu-type={dropdownType.showOtherOptions}
            >
                {item.title}
            </div>
        )
    }

    _showCode = () => {

    }

    render() {
        const { fieldInfo, field, data, value } = this.props
        if (!data) return null

        let item
        let emptyItem = { key: 'empty', title: 'Empty' }
        for (var i=0; i<data.length; i++) {
            if (data[i] && value === data[i].key) item = data[i]
        }
        
        return (
            <div>
                <div className="row field-item" style={{ marginBottom: 4 }}>
                    <div className="page-field-label">
                        <i className={`story-option ${fieldIcon.phaseTrigger}`} style={{ width: 16 }}></i>
                        {(fieldInfo && fieldInfo.fieldTitle) || field}
                    </div>
                    <div className="row-centered">
                        {item ? this._renderItem(item) : this._renderItem(emptyItem)}
                    </div>
                    <SeeCodeButton
                        onClick={this._showCode}
                    />
                </div>
                <div style={{ width: '70%', marginLeft: 'auto' }}>
                    <CodeMirror
                        value={this.state.value}
                        options={{
                            mode: 'javascript',
                            theme: 'monokai',
                            lineNumbers: true
                        }}
                        onBeforeChange={(editor, data, value) => this.setState({value})}
                    />
                </div>
                    
            </div>
        )
    }
}

export default PhaseTriggerField