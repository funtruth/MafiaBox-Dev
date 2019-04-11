import React from 'react'

import { logicType, operatorType } from '../types'
import { dropdownType } from '../../dropdown/types'

import { concatField } from '../proptool';

import LogicPanel from './LogicPanel'

export default function LogicPanels(props) {
    const { value, path } = props
    const {
        logicType: selectedLogic,
        operatorType: selectedOperator,
    } = value
    
    switch(selectedLogic) {
        case logicType.operator.key:
            switch(selectedOperator) {
                case operatorType.if.key:
                case operatorType.elseif.key:
                    return (
                        <div className="row">
                            <LogicPanel
                                {...props}
                                subfieldKey="var1"
                                placeholder="variable"
                                path={[...path, 'data', 'var1']}
                                dropdown={dropdownType.pickVar}
                            />
                            <LogicPanel
                                {...props}
                                subfieldKey="comparison"
                                placeholder="operator"
                                path={[...path, 'data', 'comparison']}
                                dropdown={dropdownType.pickComparison}
                            />
                            <LogicPanel
                                {...props}
                                subfieldKey="var2"
                                placeholder="variable"
                                path={[...path, 'data', 'var2']}
                                dropdown={dropdownType.pickVar}
                            />
                        </div>
                    )
                case operatorType.forin.key:
                    return (
                        <LogicPanel
                            {...props}
                            placeholder="UID object ..."
                            dropdown={dropdownType.pickUidObject}
                        />
                    )
                case operatorType.else.key:
                default:
                    return null
            }
        case logicType.update.key:
            return (
                <LogicPanel
                    {...props}
                    placeholder="select logic ..."
                    subfieldKey={concatField('', 'rss')}
                    path={[...path, 'data']}
                    includeSubpath
                    dropdown={dropdownType.showSubfields}
                />
            )
        case logicType.variable.key:
            return (
                <LogicPanel
                    {...props}
                    placeholder="pick ..."
                    path={[...path, 'vars']}
                    dropdown={dropdownType.declareVar}
                />
            )
        case logicType.function.key:
            return (
                <LogicPanel
                    {...props}
                    subfieldKey="var1"
                    placeholder="Pick a function ..."
                    path={[...path, 'data', 'var1']}
                    dropdown={dropdownType.pickLibrary}
                />
            )
        case logicType.return.key:
            return (
                <LogicPanel
                    {...props}
                    placeholder="return type ..."
                    path={[...path, 'data']}
                    dropdown={dropdownType.pickReturnType}
                />
            )
        default:
            return (
                <LogicPanel
                    {...props}
                    placeholder="select logic ..."
                    dropdown={dropdownType.pickLogic}
                />
            )
    }
}