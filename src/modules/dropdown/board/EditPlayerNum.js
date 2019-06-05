import React, { useState } from 'react'

import {
    DropTitle,
} from '../components/Common';
import {
    Row,
    Tag,
    Text,
} from '../../components/Common';

export default function EditPlayerNum({
    slate,
    update,
    showDropdown,
}){
    const [min, setMin] = useState(slate.min || 0)
    const [max, setMax] = useState(slate.max || 0)

    const handleMin = (e) => setMin(parseInt(e.target.value))
    const handleMax = (e) => setMax(parseInt(e.target.value))

    const onKeyDown = e => {
        switch(e.nativeEvent.key) {
            case 'Enter':
                submit()
                break
            default:
        }
    }

    const onFocus = (e) => e.target.select();

    const submit = () => {
        update({min, max})
        showDropdown();
    }
    
    return (
        <>
            <DropTitle>number of players</DropTitle>
            <Row sizes={['xs', 'z']}>
                <input
                    className="tag-input"
                    value={min}
                    onChange={handleMin}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    type='number'
                    style={{ flex: 1, width: 60 }}
                />
                <Text align="c">-</Text>
                <input
                    className="tag-input"
                    value={max}
                    onChange={handleMax}
                    onFocus={onFocus}
                    onKeyDown={onKeyDown}
                    type='number'
                    style={{ flex: 1, width: 60 }}
                />
            </Row>
            <Row x="r" sizes={['z', 's']}>
                <Tag onClick={submit}>
                    Save
                </Tag>
            </Row>
        </>
    )
}