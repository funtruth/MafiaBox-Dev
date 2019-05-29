import React from 'react'
import { useDispatch } from 'react-redux'

import _ from 'lodash'

import { VAR_DEFAULTS } from '../../logic/defaults';
import { updateType } from '../../logic/types';
import { ITEM_TYPE } from '../types';
import { DEFAULT_STRING } from '../defaults';

import { updateGeneral } from '../../page/PageReducer'
import { genUID } from '../../common/helpers';
import { parseJS } from '../../logic/proptool';

import StringInput from './StringInput';
import StringDragDrop from '../dnd/StringDragDrop'
import StringSideDrop from '../dnd/StringSideDrop'
import { Body, Row, Separator, Text } from '../../components/Common';

export default function StringPlayground(props) {
    const dispatch = useDispatch()
    const { stringRepo, stringMap, path, setActiveKey, color } = props
    
    let handleClick = (e) => {
        //if background is being clicked ...
        if (e.target.classList.contains('string-playground-click')) {
            setActiveKey('')
        }
    }

    const move = (oldIndex, newIndex) => {
        const mapClone = _.cloneDeep(stringMap)
        
        const [removed] = mapClone.splice(oldIndex, 1)
        mapClone.splice(newIndex > oldIndex ? newIndex - 1 : newIndex, 0, removed)

        dispatch(updateGeneral([...path, 'byIndex'], mapClone))
    }

    const drop = (item, index) => {
        const repoClone = _.cloneDeep(stringRepo)
        const mapClone = _.cloneDeep(stringMap)

        const newKey = genUID('variable', stringRepo)

        repoClone[newKey] = {
            ...DEFAULT_STRING,
            key: newKey,
            string: item.key,
            variable: {
                ...VAR_DEFAULTS,
                display: parseJS(item.key),
                updateType: updateType.variable,
                value: item.key,
                variableTypes: item.variableTypes,
                wildcardValue: item.isWild ? item.key : '',
            },
            color,
            type: ITEM_TYPE.variable,
        }
        mapClone.splice(index, 0, newKey)

        dispatch(updateGeneral(path, {
            byId: repoClone,
            byIndex: mapClone,
        }))
    }

    const renderItem = (stringKey, index) => {
        const item = stringRepo[stringKey]
        if (!item) return null;

        return (
            <div key={stringKey} style={{position: 'relative'}}>
                <StringSideDrop
                    left
                    index={index}
                    move={(oldIndex) => move(oldIndex, index)}
                    drop={(item) => drop(item, index)}
                />
                <StringSideDrop
                    right
                    index={index}
                    move={(oldIndex) => move(oldIndex, index + 1)}
                    drop={(item) => drop(item, index + 1)}
                />
                <StringDragDrop
                    {...props}
                    item={item}
                    index={index}
                />
            </div>
        )
    }

    return (
        <Body style={{flex: 0.65}}>
            <Text>Text</Text>
            <div className="string-playground-click" style={{flex: 1}} onClick={handleClick}>
                <Row sizes={['xxs', 's']} style={{marginBottom: 'auto'}}>
                    {(stringMap||[]).map(renderItem)}
                </Row>
            </div>
            <Separator></Separator>
            <StringInput {...props}/>
        </Body>
    )
}