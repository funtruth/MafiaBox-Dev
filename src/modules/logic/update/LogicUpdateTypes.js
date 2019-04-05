import React from 'react'

export default function LogicUpdateTypes(props) {
    const { data, prefix, path } = props
    const { update, mutate } = data

    const handleClick = (type) => {
        props.updatePage([...path, prefix], {
            [type]: !data[type],
        })
    }

    return (
        <div className="logic-updates">
            <div
                className="logic-update brighten"
                title="update-item"
                onClick={() => handleClick('update')}
                style={{
                    backgroundColor: update ? 'Mediumslateblue' : '#424650',
                    color: update ? '#fff' : '#ddd',
                }}
            >
                u
            </div>
            <div style={{ width: '2px', backgroundColor: '#aaa' }}></div>
            <div
                className="logic-update brighten"
                title="update-item"
                onClick={() => handleClick('mutate')}
                style={{
                    backgroundColor: mutate ? 'Mediumslateblue' : '#424650',
                    color: mutate ? '#fff' : '#ddd',
                }}
            >
                m
            </div>
        </div>
    )
}