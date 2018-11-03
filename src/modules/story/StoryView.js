import React from 'react'
import './story.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class StoryView extends React.Component{
    render() {
        return (
            <div style={styles.container}>
                <Link to="/home/edit">
                    <div className="footer">
                        <i class="add-role-icon ion-md-person-add"></i>
                        {'Create a New Role'}
                    </div>
                </Link>
            </div>
        )
    }
}

const styles = {
    container: {
        flex: 1,
        padding: 8,
    }
}

export default connect(
    null
)(StoryView)