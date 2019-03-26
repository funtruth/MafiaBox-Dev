import React from 'react';

export default function Footer(props) {
    const {
        m = 0,
    } = props

    const sepStyle = {
        height: 2,
        backgroundColor: '#464646',
        marginTop: m,
        marginBottom: m,
        width: '100%',
    }

    return (
        <div style={sepStyle}/>
    )
}