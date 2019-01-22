import React from 'react'

export default class TextBlur extends React.Component {
    render() {
        return (
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    backgroundColor: 'rgba(0,0,0,0.6)',
                    height: '100%',
                    width: '70%',
                    color: '#eee',
                    font: '400 14px Arial',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                Select an event first
            </div>
        )
    }
}