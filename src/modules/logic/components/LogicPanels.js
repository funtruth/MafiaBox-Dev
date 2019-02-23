import React from 'react'

import { logicType, operatorType } from '../types'
import { dropdownType } from '../../dropdown/types'

import LogicPanel from './LogicPanel'

class LogicPanels extends React.Component{
    render() {
        const { logicInfo } = this.props
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
                                    {...this.props}
                                    subfieldKey="var1"
                                    placeholder="variable"
                                    dropdown={dropdownType.pickVar}
                                />
                                <LogicPanel
                                    {...this.props}
                                    subfieldKey="comparison"
                                    placeholder="operator"
                                    dropdown={dropdownType.pickComparison}
                                />
                                <LogicPanel
                                    {...this.props}
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
                                {...this.props}
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
                        {...this.props}
                        placeholder="variable ..."
                        dropdown={dropdownType.declareVar}
                        
                    />
                )
            case logicType.function.key:
                return (
                    <LogicPanel
                        {...this.props}
                        subfieldKey="var1"
                        placeholder="function ..."
                        dropdown={dropdownType.pickLibrary}
                    />
                )
            case logicType.return.key:
                return (
                    <LogicPanel
                        {...this.props}
                        placeholder="return ..."
                        dropdown={dropdownType.pickReturnType}
                    />
                )
            default:
                return <div className="logic-panel-disabled">select logic ...</div>
        }
    }
}

export default LogicPanels