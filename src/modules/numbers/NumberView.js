import React from 'react'
import _ from 'lodash'
import { useDispatch } from 'react-redux'

import { DEFAULT_ASSIGN } from '../logic/defaults';

import { usePath } from '../hooks/Hooks';
import { genUID } from '../common/helpers';
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
    mathType=value
        |[value]|
    mathType=operator
        |[value] (operator) [value]|
*/
export default function NumberView({path}){
    const dispatch = useDispatch();
    const {
        byId: mathRepo,
        source,
    } = usePath(path)

    const clearWorkspace = () => console.log('clear')
    const resetWorkspace = () => console.log('reset')

    const initValue = (item) => {
        const newKey = genUID('math', mathRepo)

        dispatch(updateGeneral(path, {
            byId: {
                [newKey]: {
                    ...DEFAULT_ASSIGN,
                    key: newKey,
                    ...item,
                }
            },
            source: newKey,
        }))
    }
    const changeValue = (mathKey, item) => {
        dispatch(updateGeneral([...path, 'byId', mathKey], {
            ...DEFAULT_ASSIGN,
            ...item,
        }))
    }
    const nestValue = (restItem, dragItem, position) => {
        const newKey = genUID('math', mathRepo)

        dispatch(updateGeneral([...path, 'byId'], {
            [restItem.key]: {
                ...restItem,
                [position]: newKey,
            },
            [newKey]: {
                ...DEFAULT_ASSIGN,
                key: newKey,
                ...dragItem,
            },
        }))
    }

    const mainProps = {
        mathRepo,
        source,
        path,
        initValue,
        changeValue,
        nestValue,
    }

    return (
        <div>
            <PlaygroundDrop
                {...mainProps}
                clearWorkspace={clearWorkspace}
                resetWorkspace={resetWorkspace}
            />
            <Separator></Separator>
            <NumberDetailer
                {...mainProps}
            />
        </div>
    )
}