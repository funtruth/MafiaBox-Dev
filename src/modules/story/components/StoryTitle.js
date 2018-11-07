import React from 'react'

class StoryTitle extends React.Component{
    render() {
        const { item } = this.props

        return (
            <div className="story-title">
                <div className={item.palette || "black-grey"} style={styles.title}>{item.title}</div>
                <i class="story-option ion-ios-more menu-onclick" story-id={item.key} style={styles.moreIcon}></i>
                <i class="story-option ion-ios-add" story-id={item.key} style={styles.addIcon} onClick={this.props.addRole}></i>
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