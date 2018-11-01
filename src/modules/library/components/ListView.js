import React from 'react'
import { connect } from 'react-redux'

class ListView extends React.Component{
    _renderItem = (item) => {
        console.log('item', item)
        return null
    }

    render() {
        return (
            this.props.sortedRoles.map(this._renderItem)
        )
    }
}

const styles = {
    item: {

    }
}

export default connect(
    state => ({
        sortedRoles: state.library.sortedRoles,
    })
)(ListView)