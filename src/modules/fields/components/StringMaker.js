import React from 'react'
import { connect } from 'react-redux'

class StringMaker extends React.Component{
    render() {
        return (
            null
        )
    }
}

export default connect(
    state => ({
        tagRepo: state.field.tagRepo,
    }),
)(StringMaker)