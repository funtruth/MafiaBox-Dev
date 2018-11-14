import React from 'react'
import { connect } from 'react-redux'
import { updatePage } from '../PageReducer'
import * as helpers from '../../common/helpers'
import { phaseTriggerType } from '../../fields/actions'

class AddNewField extends React.Component{
    _onClick = () => {
        const { value } = this.props
        let valueClone
        if (value && value.length) {
            valueClone = Array.from(this.props.value)
        } else {
            valueClone = []
        }
        let triggerKey = helpers.genUID('trigger')

        valueClone.push({
            key: triggerKey,
            mode: phaseTriggerType.none,
            to: null,
        })

        this.props.updatePage(
            this.props.pageKey,
            this.props.field,
            valueClone,
        )
    }

    render() {
        return (
            <div className="row">
                <div className="add-field" style={styles.font} onClick={this._onClick}>
                    <i className="ion-md-add" style={{ marginRight: 5 }}></i>
                    Add Field
                </div>
            </div>
        )
    }
}

const styles = {
    font: {
        font: '400 14px Arial',
        width: null,
    }
}

export default connect(
    state => ({

    }),
    {
        updatePage,
    }
)(AddNewField)