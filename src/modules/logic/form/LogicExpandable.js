import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../proptool'

import { updatePageByPath } from '../../page/PageReducer'
import LogicPickUpdate from './LogicPickUpdate';
import AddUpdateButton from './AddUpdateButton';

class LogicExpandable extends React.Component{
    _toggle = () => {
        const { pageInfo, field, item, prefix } = this.props
        const { pageKey } = pageInfo

        this.props.updatePageByPath(pageKey, field, item, 'data', prefix, {
            expand: !pageInfo[field][item].data ||
                !pageInfo[field][item].data[prefix] ||
                !pageInfo[field][item].data[prefix].expand
        })
    }

    render() {
        const { pageInfo, field, item, nested,
            property, updates, prefix } = this.props
            
        const expanded = pageInfo[field][item].data &&
            pageInfo[field][item].data[prefix] &&
            pageInfo[field][item].data[prefix].expand
            
        const attributes = proptool.getExistingFields(prefix, pageInfo[field][item].data)
        const hasAttr = attributes.length > 0
        const isField = typeof updates === 'string'
        const isUidField = updates && updates['/uid/']
        const isVarField = property.charAt(0) === '$'
        const isAdder = !isField
        
        return (
            <div style={{ marginTop: 2, marginLeft: nested?12:0 }}>
                <div className="row-nowrap">
                    {hasAttr ? <i
                        className={`${expanded ? "mdi mdi-minus-box" : "mdi mdi-plus-box"} common-bubble`}
                        onClick={this._toggle}
                    />:<i
                        className="mdi mdi-plus-box common-bubble"
                        style={{ opacity: 0 }}
                    />}
                    <div className="common-bubble --grey27" onClick={this._toggle}>
                        {isVarField ? property.substring(1) : property}
                    </div>
                    {isField && <LogicPickUpdate {...this.props}/>}
                    {isAdder && <AddUpdateButton {...this.props}/>}
                </div>
                {expanded &&
                    attributes.map((property, index) => (
                        <LogicExpandable
                            {...this.props}
                            nested
                            key={index}
                            property={property}
                            updates={updates[isUidField ? '/uid/' : property]}
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