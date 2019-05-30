import React from 'react'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import './logic.css'

import { DEFAULT_LOGIC } from '../common/defaults';
import { LOGIC_TESTS } from '../testhub/tests';
import { modalType } from '../common/types';

import { usePath } from '../hooks/Hooks';
import { genUID } from '../common/helpers';
import { getCode } from './LogicEngine'
import { showModal } from '../modal/ModalReducer'
import { updateGeneral } from '../page/PageReducer'

import {
    Body,
    Row,
    Tag,
} from '../components/Common';
import LogicBlock from './dnd/LogicBlock';

export default function LogicView({
  path,
  vars,  
}){
    const dispatch = useDispatch()
    const {
        byId: logicRepo,
        byIndex: logicMap,
    } = usePath(path)

    let runCode = () => {
        const code = getCode(logicRepo)
        let { rss, write } = LOGIC_TESTS[0]
        // eslint-disable-next-line
        Function(`return ${code}`)()(rss, write)
        console.log('_runCode results', {rss, write})
    }

    let showCode = () => {
        const code = getCode(logicRepo)
        dispatch(showModal(modalType.showCode, {
            code,
        }))
    }

    const handleAdd = () => {
        const newLogicKey = genUID('logic', logicRepo)
        dispatch(updateGeneral(path, {
            byId: {
                [newLogicKey]: DEFAULT_LOGIC,
            },
            byIndex: [newLogicKey],
        }))
    }

    const handleAddBelow = (parentKey, logicKey, siblingKeys) => {
        const newLogicKey = genUID('logic', logicRepo)
        
        const currentClone = _.cloneDeep(siblingKeys)
        currentClone.splice(siblingKeys.indexOf(logicKey) + 1, 0, newLogicKey)

        if (parentKey) {
            dispatch(updateGeneral([...path, 'byId'], {
                [newLogicKey]: DEFAULT_LOGIC,
            }))
            dispatch(updateGeneral([...path, 'byId', parentKey], {
                byIndex: currentClone,
            }))
        } else {
            dispatch(updateGeneral(path, {
                [newLogicKey]: DEFAULT_LOGIC,
                byIndex: currentClone,
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

        dispatch(updateGeneral(path, {
            byId: repoClone,
            byIndex: mapClone,
        }))
    }

    const mainProps = {
        logicRepo,
        logicMap,
        handleAdd,
        handleAddBelow,
        moveLogic,
        path,
        vars,
    }
    
    return (
        <Body>
            <Row x="r">
                <Tag
                    icon="mdi mdi-console-line"
                    onClick={runCode}
                >
                    run code in console
                </Tag>
                <Tag
                    icon="mdi mdi-code-tags"
                    onClick={showCode}
                >
                    view code
                </Tag>
            </Row>
            <LogicBlock {...mainProps}/>
        </Body>
    )
}