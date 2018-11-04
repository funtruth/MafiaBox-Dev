import React from 'react'
import './story.css'
import { connect } from 'react-redux'

import StoryBoard from './components/StoryBoard'

class StoryView extends React.Component{
    render() {
        return (
            <div style={styles.container}>
                <StoryBoard/>
            </div>
        )
    }
}

const styles = {
    container: {
        flex: 1,
    },
}

export default connect(
    state => ({
    }),
    {
    }
)(StoryView)