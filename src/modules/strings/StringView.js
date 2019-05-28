import React, { useState } from 'react'
import { connect } from 'react-redux'

import { updateGeneral } from '../page/PageReducer'
import { stateByPath } from '../common/helpers';

import StringPlayground from './components/StringPlayground';
import StringDetailer from './components/StringDetailer';
import { Row, Separator } from '../components/Common';

function StringView(props) {
    const { path, page, updateGeneral } = props
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
            <StringPlayground {...mainProps}/>
            <Separator axis="y"></Separator>
            <StringDetailer {...mainProps}/>
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