import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { LOGIC_ITEM_VAR } from '../logic/defaults';
import { parseType, variableType } from '../logic/types';

import { parseNumber } from '../logic/LogicEngine';
import { usePath } from '../hooks/Hooks';
 import generatePushID from '../common/generatePushID';
import { updateGeneral } from '../page/PageReducer'

import PlaygroundDrop from './dnd/PlaygroundDrop';
import NumberDetailer from './components/NumberDetailer';
import {
    Separator,
} from '../components/Common';

/* LOCATIONS where user can edit numbers
    AssignNumber
    EditNumber
    
VISUALS
    parseType=value
        |[value]|
    parseType=operator
        |[value] (operator) [value]|
*/
export default function NumberView({path, scopedVars}){
    const dispatch = useDispatch();
    
    const { value, display } = usePath(path)
    const {
        byId: mathRepo,
        source,
    } = value || {}

    useEffect(() => {
        if (!mathRepo || !source) return;
        const newDisplay = parseNumber(mathRepo, source)
        if (newDisplay !== display) {
            dispatch(updateGeneral({
                path,
                update: {
                    display: newDisplay,
                    parseBy: parseType.number,
                    variableTypes: [variableType.number.key],
                }
            }))
        }
    }, [mathRepo, source, dispatch])

    //clear all math
    const clearSlate = () => {
        dispatch(updateGeneral({
            path: [...path, 'value'],
            update: {
                byId: "",
                source: "",
            }
        }))
    }

    //dropping something into PlaygroundDrop
    const initValue = (item) => {
        const newKey = generatePushID('math')

        dispatch(updateGeneral({
            path: [...path, 'value'],
            update: {
                byId: {
                    [newKey]: {
                        ...LOGIC_ITEM_VAR,
                        key: newKey,
                        ...item,
                    }
                },
                source: newKey,
            }
        }))
    }

    //dropping BasicOp onto BasicOp
    const changeValue = (mathKey, item) => {
        dispatch(updateGeneral({
            path: [...path, 'value', 'byId', mathKey, 'display'],
            update: item.display,
        }, {
            path: [...path, 'value', 'byId', mathKey, 'value', 'operator'],
            update: item.value.operator,
        }))
    }

    //wrapping (everything) with a BasicOp
    const wrapValue = (item, position) => {
        const newKey = generatePushID('math')

        dispatch(updateGeneral({
            path: [...path, 'value', 'source'],
            update: newKey
        }, {
            path: [...path, 'value', 'byId', newKey],
            update: {
                ...LOGIC_ITEM_VAR,
                ...item,
                key: newKey,
                value: {
                    ...item.value,
                    [position]: source,
                },
            },
        }))
    }

    //dropping something into ValueDrop inside a BasicOp
    const nestValue = (restItem, dragItem, position) => {
        const newKey = generatePushID('math')
        
        dispatch(updateGeneral({
            path: [...path, 'value', 'byId', restItem.key, 'value', position],
            update: newKey,
        }, {
            path: [...path, 'value', 'byId'],
            update: {
                [newKey]: {
                    ...LOGIC_ITEM_VAR,
                    key: newKey,
                    ...dragItem,
                },
            }
        }))
    }

    const mainProps = {
        mathRepo,
        source,
        path: [...path, 'value'],
        scopedVars,
        clearSlate,
        initValue,
        changeValue,
        nestValue,
        wrapValue,
    }

    return (
        <>
            <PlaygroundDrop {...mainProps}/>
            <Separator></Separator>
            <NumberDetailer {...mainProps}/>
        </>
    )
}