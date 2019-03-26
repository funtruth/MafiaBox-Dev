import React from 'react';

export default function Footer(props) {
    const {
        size = 0,
    } = props

    const sepStyle = {
        height: 2,
        backgroundColor: '#464646',
        marginTop: size,
        marginBottom: size,
        width: '100%',
    }

    return (
        <div style={sepStyle}/>
    )
}