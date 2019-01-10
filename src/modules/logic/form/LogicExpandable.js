import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../proptool'

import { updatePageByPath } from '../../page/PageReducer'
import UpdateButton from './UpdateButton'

class LogicExpandable extends React.Component{
    _toggle = () => {
        const { pageInfo, field, item, prefix } = this.props
        const { pageKey } = pageInfo

        this.props.updatePageByPath(pageKey, field, item, 'data', prefix, {
            hide: !pageInfo[field][item].data ||
                !pageInfo[field][item].data[prefix] ||
                !pageInfo[field][item].data[prefix].hide
        })
    }

    render() {
        const { pageInfo, field, item, nested,
            property, updateRef, prefix } = this.props
            
        //TODO oof
        const hidden = pageInfo[field][item].data &&
            pageInfo[field][item].data[prefix] &&
            pageInfo[field][item].data[prefix].hide
            
        const attributes = proptool.getSubfields(prefix, pageInfo[field][item].data)
        const hasAttr = attributes.length > 0
        const isVarField = property.charAt(0) === '$'

        const config = proptool.getUpdateConfig(prefix, updateRef)
        
        return (
            <div style={{ marginTop: 2, marginLeft: nested?12:0 }}>
                <div className="row-nowrap">
                    {hasAttr ? 
                        <div
                            className="common-bubble"
                            onClick={this._toggle}
                        >
                            <i className={hidden ? "mdi mdi-plus-box" : "mdi mdi-minus-box"}/>
                        </div>
                        :<i
                            className="mdi mdi-plus-box common-bubble"
                            style={{ opacity: 0 }}
                        />
                    }
                    <div className={`common-bubble ${isVarField?'--var':'--grey27'}`} onClick={this._toggle}>
                        {property}
                    </div>
                    {!config.hideButton && <UpdateButton {...this.props} config={config}/>}
                </div>
                {!hidden &&
                    attributes.map((property, index) => (
                        <LogicExpandable
                            {...this.props}
                            nested
                            key={index}
                            property={property.subfield}
                            prefix={prefix + "." + property.subfield}
                        />
                    ))
                }
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: proptool.addPlayerRef(state.template),
    }),
    {
        updatePageByPath,
    }
)(LogicExpandable)