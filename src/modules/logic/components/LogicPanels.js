import React from 'react'

import { logicType, operatorType } from '../types'
import { dropdownType } from '../../dropdown/types'

import LogicPanel from './LogicPanel'

export default function LogicPanels(props) {
    const { logicInfo } = props
    const {
        logicType: selectedLogic,
        operatorType: selectedOperator,
    } = logicInfo
    
    switch(selectedLogic) {
        case logicType.operator.key:
            switch(selectedOperator) {
                case operatorType.if.key:
                case operatorType.elseif.key:
                    return (
                        <div>
                            <LogicPanel
                                {...props}
                                subfieldKey="var1"
                                placeholder="variable"
                                dropdown={dropdownType.pickVar}
                            />
                            <LogicPanel
                                {...props}
                                subfieldKey="comparison"
                                placeholder="operator"
                                dropdown={dropdownType.pickComparison}
                            />
                            <LogicPanel
                                {...props}
                                subfieldKey="var2"
                                placeholder="variable"
                                dropdown={dropdownType.pickVar}
                            />
                        </div>
                    )
                case operatorType.else.key:
                    return <div className="logic-panel-disabled">N/A</div>
                case operatorType.forin.key:
                    return (
                        <LogicPanel
                            {...props}
                            placeholder="UID object ..."
                            dropdown={dropdownType.pickUidObject}
                        />
                    )
                default:
                    return null
            }
        case logicType.update.key:
            return <div className="logic-panel-disabled">N/A</div>
        case logicType.variable.key:
            return (
                <LogicPanel
                    {...props}
                    placeholder="variable ..."
                    dropdown={dropdownType.declareVar}
                    
                />
            )
        case logicType.function.key:
            return (
                <LogicPanel
                    {...props}
                    subfieldKey="var1"
                    placeholder="Pick a function ..."
                    dropdown={dropdownType.pickLibrary}
                />
            )
        case logicType.return.key:
            return (
                <LogicPanel
                    {...props}
                    placeholder="return ..."
                    dropdown={dropdownType.pickReturnType}
                />
            )
        default:
            return <div className="logic-panel-disabled">select logic ...</div>
    }
}