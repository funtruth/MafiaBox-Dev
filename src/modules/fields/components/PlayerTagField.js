import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

function PlayerTagField(props) {
    const { updateRef, value, path } = props

    const tags = _(updateRef)
        .filter(i => i.tag)
        .value()

    let handleClick = (item, active) => {
        props.updatePage(path, {
            [item.subfield]: !active,
        })
    }
    
    return (
        <div className="row -x-p">
            {tags.map(item => {
                const active = value && value[item.subfield]
                
                return (
                    <div
                        key={item.key}
                        className="field-tag"
                        style={{
                            backgroundColor: active && (item.color || '#6279CA'),
                        }}
                        onClick={() => handleClick(item, active)}
                    >
                        {item.subfield}
                    </div>
                )
            })}
        </div>
    )
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    })
)(PlayerTagField)