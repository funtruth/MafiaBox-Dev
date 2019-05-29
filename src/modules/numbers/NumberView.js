import React from 'react'
import { useDispatch } from 'react-redux'

import { usePath } from '../hooks/Hooks';
import { updateGeneral } from '../page/PageReducer'

import PlaygroundDrop from './dnd/PlaygroundDrop';
import NumberDetailer from './components/NumberDetailer';
import {
    Separator,
} from '../components/Common';

/* LOCATIONS where user can edit numbers
    EditEvent
    
VISUALS
    mathType: value
        |[value]|
    mathType: operator
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

    const changeValue = (mathKey, item) => {

    }
    const changeOperator = (mathKey, item) => {

    }
    const changeOperatorToValue = (mathKey, item) => {

    }
    const changeValueToOperator = (mathKey, item) => {

    }

    const mainProps = {
        mathRepo,
        source,
        path,
        changeValue,
        changeOperator,
        changeOperatorToValue,
        changeValueToOperator,
    }

    return (
        <div>
            <PlaygroundDrop
                subpath={['assign']}
                clearWorkspace={clearWorkspace}
                resetWorkspace={resetWorkspace}
            />
            <Separator></Separator>
            <NumberDetailer {...mainProps}/>
        </div>
    )
}