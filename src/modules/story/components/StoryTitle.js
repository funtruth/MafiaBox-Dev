import React from 'react'

class StoryTitle extends React.Component{
    render() {
        const { item } = this.props

        return (
            <div className="story-title">
                <div className={item.palette || "black-grey"} style={styles.title}>{item.title}</div>
                <i class="ion-ios-more" style={styles.moreIcon}></i>
                <i class="ion-ios-add" style={styles.addIcon}></i>
            </div>
        )
    }
}

const styles = {
    title: {
        borderRadius: 2,
        padding: '2px 10px',
        marginRight: 'auto',
    },
    moreIcon: {
        fontSize: 16,
        color: '#a6a6a6',
        marginRight: 10,
    },
    addIcon: {
        fontSize: 19,
        color: '#a6a6a6',
        marginRight: 2,
    }
}

export default StoryTitle