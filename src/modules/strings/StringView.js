import React, { useState } from 'react'

import { usePath } from '../hooks/Hooks';

import StringPlayground from './components/StringPlayground';
import StringDetailer from './components/StringDetailer';
import { Row, Separator } from '../components/Common';

/* LOCATIONS where user can edit strings
    EditEvent
    EditToast
    
Strings should not be an assignable variable. In cases where strings are used, such as events and toast pop-ups, the string cannot be editted in a way that is practical. Events should not be modified at the update level, but controlled at the source. I have chosen not to include an EditString modal on purpose, Change my mind.
*/
export default function StringView({path}) {
    const {
        byId: stringRepo,
        byIndex: stringMap,
    } = usePath(path)

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
    }
    
    return (
        <Row style={{flex: 1}}>
            <StringPlayground {...mainProps}/>
            <Separator axis="y"></Separator>
            <StringDetailer {...mainProps}/>
        </Row>
    )
}