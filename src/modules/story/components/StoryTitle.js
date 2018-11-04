import React from 'react'

class StoryTitle extends React.Component{
    render() {
        const { item } = this.props

        return (
            <div className="story-title">
                <div className={item.palette || "black-grey"} style={styles.title}>{item.title}</div>

            </div>
        )
    }
}

const styles = {
    title: {
        borderRadius: 2,
        padding: '2px 10px',
    }
}

export default StoryTitle