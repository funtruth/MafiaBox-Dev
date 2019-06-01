import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

import { ITEM_TYPE } from './types';
import { DEFAULT_STRING } from './defaults';
import { LOGIC_ITEM_VAR } from '../logic/defaults';

import { usePath } from '../hooks/Hooks';
import { updateGeneral } from '../page/PageReducer'
import { parseJS } from '../logic/proptool';
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
    const {
        byId: stringRepo,
        byIndex: stringMap,
    } = usePath(path)

    const [color, setColor] = useState('whitish')
    const [activeKey, setActiveKey] = useState('')

    //add new string from text input
    const addString = (text) => {
        if (!text) return;

        if (activeKey === '') {
            let mapClone = _.cloneDeep(stringMap || [])
    
            const newKey = generatePushID('string')
    
            mapClone.push(newKey)
            
            dispatch(updateGeneral({
                path,
                update: {
                    byIndex: mapClone,
                },
            }, {
                path: [...path, 'byId'],
                update: {
                    [newKey]: {
                        ...DEFAULT_STRING,
                        key: newKey,
                        string: text,
                        type: ITEM_TYPE.string,
                        color,
                    }
                }
            }))
        } else {
            dispatch(updateGeneral({
                path: [...path, 'byId', activeKey],
                update: {
                    string: text,
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
            path: [...path, 'byIndex'],
            update: mapClone,
        }))
    }

    //a variable is dropped into StringSideDrop
    const dropString = (item, index) => {
        const mapClone = _.cloneDeep(stringMap)

        const newKey = generatePushID('variable')

        mapClone.splice(index, 0, newKey)

        dispatch(updateGeneral({
            path,
            update: {
                byIndex: mapClone,
            }
        }, {
            path: [...path, 'byId'],
            update: {
                [newKey]: {
                    ...DEFAULT_STRING,
                    key: newKey,
                    string: item.key,
                    variable: {
                        ...LOGIC_ITEM_VAR,
                        display: parseJS(item.key),
                        nativeValue: item.key,
                        value: item.key,
                        variableTypes: item.variableTypes,
                    },
                    color,
                    type: ITEM_TYPE.variable,
                },
            },
        }))
    }

    //change color
    const pickColor = (color) => {
        if (activeKey !== '') {
            dispatch(updateGeneral({
                path: [...path, 'byId', activeKey],
                update: {
                    color,
                }
            }))
        }
        setColor(color);
    }
    
    const mainProps = {
        stringRepo,
        stringMap,
        color,
        setColor,
        activeKey,
        setActiveKey,
        path,
        scopedVars,
        addString,
        moveString,
        dropString,
        pickColor,
    }
    
    return (
        <Row style={{flex: 1}}>
            <StringPlayground {...mainProps}/>
            <Separator axis="y"></Separator>
            <StringDetailer {...mainProps}/>
        </Row>
    )
}