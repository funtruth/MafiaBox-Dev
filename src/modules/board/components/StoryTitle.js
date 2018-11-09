import React from 'react'

class StoryTitle extends React.Component{
    render() {
        const { item, index } = this.props

        return (
            <div className="story-title">
                <div className={item.palette || "black-grey"} style={styles.title}>{item.title}</div>
                <i className="story-option ion-ios-more menu-onclick" story-index={index} style={styles.moreIcon}></i>
                <i className="story-option ion-ios-add" story-index={index} style={styles.addIcon} onClick={this.props.addPage}></i>
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
    },
    addIcon: {
        fontSize: 19,
    }
}

export default StoryTitle