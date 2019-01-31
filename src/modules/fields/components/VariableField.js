import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'

class VariableField extends React.Component{
    render() {
        const { value } = this.props
        
        return (
            <div className="row">
                {_.toArray(value).map((item, index) => (
                    <div key={index} className="row">
                        <i
                            className={`${variableType[item.variableType || variableType.any].icon} logic-label`}
                            style={{
                                color: '#fff',
                                cursor: 'default',
                            }}
                        />
                        <div
                            className="property-button"
                            style={{
                                backgroundColor: 'rgba(40, 43, 48,1)',
                                cursor: 'default',
                            }}
                        >
                            {item.key || 'Untitled'}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}

export default VariableField