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
        const { pageInfo, field, item, nested,
            property, room, prefix } = this.props
            
        const expanded = pageInfo[field][item].data &&
            pageInfo[field][item].data[prefix] &&
            pageInfo[field][item].data[prefix].expand
        const hasChildren = !room.dropdownType
        
        return (
            <div style={{ marginTop: 2, marginLeft: nested?12:0 }}>
                <div className="row" onClick={this._toggle}>
                    <div className="common-bubble --grey27">
                        {property}
                        {hasChildren && <i
                            className={`${expanded ? "ion-md-arrow-dropup" : "ion-md-arrow-dropdown"} common-bubble`}
                            data-tip={expanded ? "Collapse" : "Expand"}
                            style={{ marginLeft: 12 }}
                        />}
                    </div>
                    {!hasChildren && <LogicPickUpdate {...this.props}/>}
                </div>
                {expanded && hasChildren &&
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