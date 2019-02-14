import React from 'react'

import { logicType, operatorType } from '../types'
import { dropdownType } from '../../dropdown/types'

import LogicPanel from './LogicPanel'

class LogicPanels extends React.Component{
    render() {
        const { pageKey, fieldKey, indexKey, logicInfo, vars } = this.props
        const { data } = logicInfo

        switch(logicInfo.logicType) {
            case logicType.operator.key:
                switch(logicInfo.operatorType) {
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
                    <div
                        className="logic-button app-onclick"
                        menu-type={dropdownType.pickReturnType}
                        app-onclick-props={JSON.stringify({
                            pageKey, fieldKey, indexKey,
                            attach: data,
                            attachVar: vars,
                        })}
                        style={{
                            color: '#fff',
                            borderRadius: '0px 4px 4px 0px',
                        }}
                    >
                        {data.key}
                    </div>
                )
            default:
                return <div className="logic-panel-disabled">select logic ...</div>
        }
    }
}

export default LogicPanels