import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

import { parseType, variableType } from '../logic/types';
import { LOGIC_ITEM_VAR } from '../logic/defaults';

import { usePath } from '../hooks/Hooks';
import { parseString } from '../logic/LogicEngine';
import { updateGeneral } from '../page/PageReducer'
 import generatePushID from '../common/generatePushID';

import StringPlayground from './components/StringPlayground';
import StringDetailer from './components/StringDetailer';
import { Row, Separator } from '../components/Common';

/* LOCATIONS where user can edit strings
    EditEvent
    EditToast
    
Strings should not be an assignable variable. In cases where strings are used, such as events and toast pop-ups, the string cannot be editted in a way that is practical. Events should not be modified at the update level, but controlled at the source. I have chosen not to include an EditString modal on purpose, Change my mind.
*/
export default function StringView({path, scopedVars}) {
    const dispatch = useDispatch();

    const [activeKey, setActiveKey] = useState('')
    const { value, display } = usePath(path)
    const {
        byId: stringRepo,
        byIndex: stringMap,
    } = value || {}

    useEffect(() => {
        if (!stringRepo || !stringMap) return;
        const newDisplay = parseString(value || {})
        if (newDisplay !== display) {
            dispatch(updateGeneral({
                path,
                update: {
                    display: newDisplay,
                    parseBy: parseType.string,
                    variableTypes: [variableType.string.key],
                }
            }))
        }
    }, [stringRepo, stringMap, dispatch])

    //add new string from text input
    const addString = (text) => {
        if (!text) return;

        if (activeKey === '') {
            let mapClone = _.cloneDeep(stringMap || [])
    
            const newKey = generatePushID('string')
    
            mapClone.push(newKey)
            
            dispatch(updateGeneral({
                path: [...path, 'value'],
                update: {
                    byIndex: mapClone,
                },
            }, {
                path: [...path, 'value', 'byId'],
                update: {
                    [newKey]: {
                        ...LOGIC_ITEM_VAR,
                        key: newKey,
                        value: text,
                        display: text,
                        parseBy: parseType.constant,
                    }
                }
            }))
        } else {
            dispatch(updateGeneral({
                path: [...path, 'value', 'byId', activeKey],
                update: {
                    value: text,
                    display: text,
                }
            }))
        }
    }

    //a string/variable is moved to a new index
    const moveString = (oldIndex, newIndex) => {
        const mapClone = _.cloneDeep(stringMap)
        
        const [removed] = mapClone.splice(oldIndex, 1)
        mapClone.splice(newIndex > oldIndex ? newIndex - 1 : newIndex, 0, removed)

        dispatch(updateGeneral({
            path: [...path, 'value', 'byIndex'],
            update: mapClone,
        }))
    }

    //a variable is dropped into StringSideDrop
    const dropString = (item, index) => {
        const mapClone = _.cloneDeep(stringMap)

        const newKey = generatePushID('variable')

        mapClone.splice(index, 0, newKey)

        dispatch(updateGeneral({
            path: [...path, 'value'],
            update: {
                byIndex: mapClone,
            }
        }, {
            path: [...path, 'value', 'byId'],
            update: {
                [newKey]: {
                    ...LOGIC_ITEM_VAR,
                    key: newKey,
                    value: item.key,
                    display: item.key,
                    parseBy: parseType.variable,
                },
            },
        }))
    }
    
    const mainProps = {
        path,
        stringRepo,
        stringMap,
        activeKey,
        setActiveKey,
        scopedVars,
        addString,
        moveString,
        dropString,
    }
    
    return (
        <Row style={{flex: 1}}>
            <StringPlayground {...mainProps}/>
            <Separator axis="y"></Separator>
            <StringDetailer {...mainProps}/>
        </Row>
    )
}