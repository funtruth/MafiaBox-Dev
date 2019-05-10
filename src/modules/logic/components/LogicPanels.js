import React from 'react'

import { logicType, operatorType } from '../types'
import { dropdownType } from '../../dropdown/types'

import { concatField } from '../proptool';

import LogicPanel from './LogicPanel'
import {
    LogicButton,
    Row,
} from '../../components/Common';

export default function LogicPanels(props) {
    const { logicItem, path } = props
    const {
        logicType: selectedLogic,
        operatorType: selectedOperator,
    } = logicItem
    
    switch(selectedLogic) {
        case logicType.operator.key:
            switch(selectedOperator) {
                case operatorType.if.key:
                case operatorType.elseif.key:
                    return (
                        <Row>
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
                                dropdown={dropdownType.pickVarWithType}
                            />
                        </Row>
                    )
                case operatorType.forin.key:
                    return (
                        <Row>
                            <LogicButton>in</LogicButton>
                            <LogicPanel
                                {...props}
                                placeholder="UID object ..."
                                dropdown={dropdownType.pickUidObject}
                            />
                        </Row>
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
                    includeSubpath
                    dropdown={dropdownType.declareOrAssignVar}
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