import React from 'react'
import { connect } from 'react-redux'

import { updatePageByPath } from '../../page/PageReducer'
import LogicPickUpdate from './LogicPickUpdate';

class LogicExpandable extends React.Component{
    _toggle = () => {
        const { pageInfo, field, item, prefix } = this.props
        const { pageKey } = pageInfo

        let dataClone = {}
        Object.assign(dataClone, pageInfo[field][item].data)
        if (!dataClone[prefix]) dataClone[prefix] = {}
        dataClone[prefix].expand = !dataClone[prefix].expand
        
        this.props.updatePageByPath(pageKey, field, item, 'data', dataClone)
    }

    render() {
        const { pageInfo, logicInfo, field, item, nested,
            property, room, prefix } = this.props
            
        const expanded = pageInfo[field][item].data &&
            pageInfo[field][item].data[prefix] &&
            pageInfo[field][item].data[prefix].expand
        const hasPicker = typeof room.dropdownType === 'string'
        const hasUidChild = room['/uid/'] && logicInfo.data[prefix] && logicInfo.data[prefix].value
        
        return (
            <div style={{ marginTop: 2, marginLeft: nested?12:0 }}>
                <div className="row">
                    {!hasPicker || hasUidChild ? <i
                        className={`${expanded ? "mdi mdi-minus-box" : "mdi mdi-plus-box"} common-bubble`}
                        onClick={this._toggle}
                    />:<i
                        className="mdi mdi-plus-box common-bubble"
                        style={{ opacity: 0 }}
                    />}
                    <div className="common-bubble --grey27" onClick={this._toggle}>
                        {property}
                    </div>
                    {hasPicker && <LogicPickUpdate {...this.props}/>}
                </div>
                {expanded && !hasPicker &&
                    Object.keys(room).map((property, index) => (
                        <LogicExpandable
                            {...this.props}
                            nested
                            key={index}
                            property={property}
                            room={room[property]}
                            prefix={prefix + "." + property}
                        />
                    ))
                }
                {expanded && hasUidChild &&
                    Object.keys(room['/uid/']).map((property, index) => (
                        <LogicExpandable
                            {...this.props}
                            nested
                            key={index}
                            property={property}
                            room={room['/uid/'][property]}
                            prefix={prefix + "./uid/." + property}
                        />
                    ))
                }
            </div>
        )
    }
}

export default connect(
    null,
    {
        updatePageByPath,
    }
)(LogicExpandable)