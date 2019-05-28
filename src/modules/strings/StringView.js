import React, { useState } from 'react'
import { connect } from 'react-redux'

import { updateGeneral } from '../page/PageReducer'
import { stateByPath } from '../common/helpers';

import StringPlayground from './components/StringPlayground';
import StringDetailer from './components/StringDetailer';
import {
    Body,
    Row,
} from '../components/Common';

function StringView(props) {
    const { path, page, attachVar, updateGeneral } = props
    const {
        byId: stringRepo,
        byIndex: stringMap,
    } = stateByPath(path, page) || {}

    const [color, setColor] = useState('whitish')
    const [activeKey, setActiveKey] = useState('')

    const mainProps = {
        stringRepo,
        stringMap,
        color,
        setColor,
        activeKey,
        setActiveKey,
        path,
        updateGeneral,
    }
    
    return (
        <Row style={{flex: 1}}>
            <Body style={{flex: 0.65}}>
                <StringPlayground {...mainProps}/>
            </Body>
            <StringDetailer {...mainProps} vars={attachVar}/>
        </Row>
    )
}

export default connect(
    state => ({
        page: state.page,
    }),
    {
        updateGeneral,
    }
)(StringView)