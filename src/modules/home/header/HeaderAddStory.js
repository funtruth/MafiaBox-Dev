import React from 'react'
import { connect } from 'react-redux'

import { addStory } from '../../page/PageReducer'

function HeaderAddStory(props) {
    const { boardType } = props
    
    const handleClick = () => {
        props.addStory(boardType)
    }

    return (
        <div
            className="header-button"
            onClick={handleClick}
        >
            <i className="mdi mdi-table-plus option-icon"></i>
            <div style={{ marginLeft: 6 }}>Add Story</div>
        </div>
    )
}

export default connect(
    null,
    {
        addStory
    }
)(HeaderAddStory)