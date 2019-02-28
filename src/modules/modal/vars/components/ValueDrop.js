import React, { useState, useEffect } from 'react'
import { DropTarget } from 'react-dnd'
import * as helpers from '../../../common/helpers'

import { ItemTypes } from './Constants'
import { opValueType, DEFAULT_ASSIGN } from './ops'

const MAGIC_FACTOR = 6.5

const itemTarget = {
    drop(props, monitor) {
        const item = monitor.getItem()
        const newItem = {
            ...item.opInfo,
            left: DEFAULT_ASSIGN,
            right: DEFAULT_ASSIGN,
        }
        props.setWorkspace(helpers.updateByPath(props.subpath, newItem, props.workspace))
    }
}

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver({ shallow: true }),
    }
}


function ValueDrop(props) {
    let [rng] = useState(helpers.genUID('txt'))
    const { connectDropTarget, isOver, children, opInfo } = props
    const isConstant = opInfo && opInfo.opValueType === opValueType.constant.key
    
    useEffect(() => {
        const el = document.getElementById(rng)
        if (!el) return;

        function resize() {el.style.width = ((el.value.length+1) * MAGIC_FACTOR) + 'px'}
        var e = 'keyup,keypress,focus,blur,change'.split(',');
        for (var i in e) el.addEventListener(e[i], resize, false);
        resize();
        return () => {
            var e = 'keyup,keypress,focus,blur,change'.split(',');
            for (var i in e) el.removeEventListener(e[i], resize, false);
        }
    }, [])
    
    if (isConstant) {
        let onChange = (e) => props.setWorkspace(
            helpers.updateByPath(
                props.subpath,
                {
                    value: e.target.value,
                },
                props.workspace,
            )
        )

        let handleFocus = (e) => e.target.select();

        return connectDropTarget(
            <input
                id={rng}
                className="playground-constant"
                value={opInfo.value || ''}
                onChange={onChange}
                onFocus={handleFocus}
                type='number'
                style={{
                    color: isOver && '#fff',
                    backgroundColor: isOver && '#6279CA',
                    cursor: 'pointer',
                }}
            />
        );
    }
    
    return connectDropTarget(
        <div
            className="basic-op-bubble"
            style={{
                color: isOver && '#fff',
                backgroundColor: isOver && '#6279CA',
            }}
        >
            {children}
        </div>
    );
}

export default DropTarget(
    [ItemTypes.BASIC_OP, ItemTypes.VALUE],
    itemTarget,
    collect
)(ValueDrop);