import React from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import './logic.css'

import { DEFAULT_LOGIC } from '../common/defaults';
import { LOGIC_TESTS } from '../testhub/tests';
import { modalType } from '../common/types';

import { usePath } from '../hooks/Hooks';
 import generatePushID from '../common/generatePushID';
import { getCode } from './LogicEngine'
import { showModal } from '../modal/ModalReducer'
import { updateGeneral } from '../page/PageReducer'
import { copyContent } from './LogicReducer';

import {
    Body,
    Row,
    Tag,
} from '../components/Common';
import LogicBlock from './dnd/LogicBlock';
import LogicDeclare from './components/LogicDeclare';

export default function LogicView({ path }) {
    const dispatch = useDispatch()
    const { clipboard } = useSelector(state => state.logic)
    
    const {
        byId: logicRepo,
        byIndex: logicMap,
        vars,
    } = usePath(path)

    const copyCode = () => {
        dispatch(copyContent({byId: logicRepo, byIndex: logicMap, vars}))
    }

    const pasteCode = () => {
        dispatch(updateGeneral({path, update: clipboard}))
    }

    const runCode = () => {
        const code = getCode({byId: logicRepo, byIndex: logicMap, vars})
        
        try {
            console.time('eval test.')
            for (var i=0; i<100; i++) {
                const { rss, next } = _.cloneDeep(LOGIC_TESTS[0])
                // eslint-disable-next-line
                Function(`return ${code}`)()(rss, next)
            }
            console.timeEnd('eval test.')

            const { rss, next } = _.cloneDeep(LOGIC_TESTS[0])
            console.log('_runCode results', {rss, next})
        } catch {
            console.log('error')
        }
    }

    const showCode = () => {
        const code = getCode({byId: logicRepo, byIndex: logicMap, vars})
        dispatch(showModal(modalType.showCode, {
            code,
        }))
    }

    const handleAdd = () => {
        const newLogicKey = generatePushID('logic')
        dispatch(updateGeneral({
            path,
            update: {
                byId: {
                    [newLogicKey]: {
                        ...DEFAULT_LOGIC,
                        key: newLogicKey,
                    },
                },
                byIndex: [newLogicKey],
            },
        }))
    }

    const handleAddBelow = (parentKey, logicKey, siblingKeys) => {
        const newLogicKey = generatePushID('logic')
        
        const currentClone = _.cloneDeep(siblingKeys)
        currentClone.splice(siblingKeys.indexOf(logicKey) + 1, 0, newLogicKey)

        if (parentKey) {
            dispatch(updateGeneral({
                path: [...path, 'byId'],
                update: {
                    [newLogicKey]: {
                        ...DEFAULT_LOGIC,
                        key: newLogicKey,
                    },
                },
            }, {
                path: [...path, 'byId', parentKey],
                update: {
                    byIndex: currentClone,
                },
            }))
        } else {
            dispatch(updateGeneral({
                path,
                update: {
                    byIndex: currentClone,
                },
            }, {
                path: [...path, 'byId'],
                update: {
                    [newLogicKey]: {
                        ...DEFAULT_LOGIC,
                        key: newLogicKey,
                    },
                },
            }))
        }
    }

    const moveLogic = (newLogicKey, newIndex) => (oldLogicKey, oldIndex) => {
        const repoClone = _.cloneDeep(logicRepo)
        const mapClone = _.cloneDeep(logicMap)
        
        const oldPointer = oldLogicKey ? repoClone[oldLogicKey].byIndex : mapClone
        const newPointer = newLogicKey ? repoClone[newLogicKey].byIndex : mapClone
        
        const [removed] = oldPointer.splice(oldIndex, 1)
        newPointer.splice(newIndex, 0, removed)

        dispatch(updateGeneral({
            path,
            update: {
                byId: repoClone,
                byIndex: mapClone,
            },
        }))
    }

    const deleteLogic = (logicKey, parentKey) => {
        if (!logicKey) return;

        const repoClone = _.cloneDeep(logicRepo)
        const mapClone = _.cloneDeep(logicMap)

        let pointer;
        if (parentKey) {
            if (repoClone[parentKey]) {
                pointer = repoClone[parentKey].byIndex
            }
        } else {
            pointer = mapClone
        }

        if (pointer) pointer.splice(pointer.indexOf(logicKey), 1)
        
        //TODO clean up declared variables?
        dispatch(updateGeneral({
            path,
            update: {
                byId: repoClone,
                byIndex: mapClone,
            },
        }))
    }

    //deletes variables if they were declared at given logicKey
    const deleteVariables = (logicKey) => () => {
        const scopedVars = _.filter(vars, i => i.scope === logicKey)
        
        dispatch(updateGeneral(...(
            scopedVars.map(i => ({
                path: [...path, 'vars', i.key],
                update: ""
            }))
        )))
    }

    const mainProps = {
        logicRepo,
        logicMap,
        vars: _.filter(vars),
        handleAdd,
        handleAddBelow,
        moveLogic,
        deleteLogic,
        deleteVariables,
        path,
        rootPath: path,
        scope: [],
    }
    
    return (
        <Body>
            <Row x="r">
                <Tag
                    icon="content-paste"
                    text="paste"
                    onClick={pasteCode}
                />
                <Tag
                    icon="content-copy"
                    text="copy"
                    onClick={copyCode}
                />
                <Tag
                    icon="console-line"
                    text="run code in console"
                    onClick={runCode}
                />
                <Tag
                    icon="code-tags"
                    text="view code"
                    onClick={showCode}
                />
            </Row>
            <LogicDeclare {...mainProps} readOnly/>
            <LogicBlock {...mainProps}/>
        </Body>
    )
}