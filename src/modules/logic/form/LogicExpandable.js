import React from 'react'
import { connect } from 'react-redux'
import * as proptool from '../proptool'

import { updatePageByPath } from '../../page/PageReducer'
import { updateTopModal } from '../../modal/ModalReducer'
import UpdateButton from './UpdateButton'

class LogicExpandable extends React.Component{
    _toggle = () => {
        const { pageKey, fieldKey, indexKey, subfieldKey, logicInfo, prefix } = this.props
        
        if (subfieldKey) {
            this.props.updateTopModal('attach', 'value', prefix, {
                hide: !logicInfo.data ||
                    !logicInfo.data[prefix] ||
                    !logicInfo.data[prefix].hide
            })
        } else {
            this.props.updatePageByPath(pageKey, fieldKey, indexKey, 'data', prefix, {
                hide: !logicInfo.data ||
                    !logicInfo.data[prefix] ||
                    !logicInfo.data[prefix].hide
            })
        }
    }

    render() {
        const { logicInfo, nested, property, updateRef, prefix } = this.props
    
        const hidden = logicInfo.data && logicInfo.data[prefix] && logicInfo.data[prefix].hide
        const attributes = proptool.getSubfields(prefix, logicInfo.data)
        const hasAttr = attributes.length > 0
        const isVarField = property.charAt(0) === '$'

        const config = proptool.getUpdateConfig(prefix, updateRef)
        
        return (
            <div style={{ marginTop: 2, marginLeft: nested ? 12 : 0 }}>
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
                    <div
                        className={`common-bubble ${isVarField?'--var':'--grey27'}`}
                        onClick={this._toggle}
                        style={{
                            cursor: 'pointer',
                        }}
                    >
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
    null,
    {
        updatePageByPath,
        updateTopModal,
    }
)(LogicExpandable)