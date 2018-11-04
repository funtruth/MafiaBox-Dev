import React from 'react'

class StoryTitle extends React.Component{
    render() {
        const { item } = this.props

        return (
            <div className="story-title">
                <div className="black-grey" style={styles.title}>{item}</div>

            </div>
        )
    }
}

const styles = {
    title: {
        borderRadius: 2,
        padding: '4px 10px',
    }
}

export default StoryTitle