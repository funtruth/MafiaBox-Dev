import React, { useState } from 'react'
import { connect } from 'react-redux'

import { updateGeneral } from '../page/PageReducer'

import StringPlayground from './components/StringPlayground';
//import StringDetailer from './components/StringDetailer';
import {
    Body,
    Row,
} from '../components/Common';
import { stateByPath, genUID } from '../common/helpers';

function StringView(props) {
    const { path, page, subfieldKey, attachVar, updateGeneral } = props
    const {
        byId: stringRepo,
        byIndex: stringMap,
    } = stateByPath(path, page) || {}

    let [text, setText] = useState('')
    let [error, setError] = useState('')

    const mainProps = {
        stringRepo,
        stringMap,
        text, setText,
        setError,
        path,
        updateGeneral,
    }
    
    return (
        <Row style={{flex: 1}}>
            <Body>
                <StringPlayground {...mainProps}/>
            </Body>
            {/*<StringDetailer {...mainProps} vars={attachVar}/>*/}
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