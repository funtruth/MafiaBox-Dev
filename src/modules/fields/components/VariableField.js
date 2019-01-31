import React from 'react'
import _ from 'lodash'

import { variableType } from '../../logic/types'
import { dropdownType } from '../../dropdown/types';

class VariableField extends React.Component{
    render() {
        const { value, fieldKey } = this.props
        console.log(value)
        return (
            <div className="row -x-p">
                {_.toArray(value).map((item, index) => (
                    <div key={index} className="row">
                        <i 
                            className={`${variableType[item.variableType || variableType.any.key].icon} logic-label app-onclick`}
                            menu-type={dropdownType.pickVarType}
                            app-onclick-props={JSON.stringify({
                                fieldKey,
                                indexKey: item.key,
                                currentValue: item.variableType,
                            })}
                            style={{
                                color: '#fff',
                            }}
                        />
                        <div
                            className="property-button app-onclick"
                            menu-type={dropdownType.editVar}
                            app-onclick-props={JSON.stringify({
                                fieldKey,
                                tagKey: item.key,
                            })}
                            style={{
                                backgroundColor: 'rgba(40, 43, 48,1)',
                                marginRight: 6,
                            }}
                        >
                            {item.key}
                        </div>
                    </div>
                ))}
                <div
                    className="property-button app-onclick"
                    menu-type={dropdownType.addVar}
                    app-onclick-props={JSON.stringify({
                        fieldKey,
                    })}
                    style={{
                        backgroundColor: 'hsla(0,0%,100%,.1)',
                    }}
                >
                    add var
                </div>
            </div>
        )
    }
}

export default VariableField