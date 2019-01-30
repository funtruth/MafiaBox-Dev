import React from 'react'
import { connect } from 'react-redux'

import { triggerNewVars } from '../../logic/types'
import { logicType } from '../../logic/types'

import { getUpdateCode } from '../../logic/LogicReducer'

import LogicNewVars from '../../logic/components/LogicNewVars'
import LogicObject from '../../logic/form/LogicObject';
import CodeField from '../../fields/components/CodeField';
import ModalOptions from '../components/ModalOptions';

var beautify_js = require('js-beautify');

class EditTrigger extends React.Component {
    _onSave = () => {
        this.props.onSave()
        this.props.popModalBy(1)
    }
    
    render() {
        const { pageKey, fieldKey, indexKey, subfieldKey, attach, attachVar, updateRef } = this.props
        
        const data = attach && attach.value
        const iprops = {
            indexKey,
            logicInfo: {
                data,
                logicType: logicType.update.key,
            },
            pageKey,
            fieldKey,
            subfieldKey,
            vars: {
                ...attachVar,
                ...triggerNewVars,
            },
        }
        
        const code = beautify_js(getUpdateCode(data), {brace_style: 'end-expand'})
        
        return (
            <div cancel-appclick="true">
                <div className="row">
                    <div className="border-right -t-m">
                        <div className="dashboard-section-title">VARIABLES</div>
                        <div className="-x-p">
                            <LogicNewVars newVars={attachVar}/>
                        </div>
                        <div className="-sep"/>
                        <div className="dashboard-section-title">NEW VARIABLES</div>
                        <div className="-x-p">
                            <LogicNewVars newVars={triggerNewVars}/>
                        </div>
                        <div className="-sep"/>
                        <div className="dashboard-section-title">UPDATES ON TRIGGER</div>
                        <div className="-x-p -y-p">
                            <LogicObject {...iprops} updateRef={updateRef}/>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#272822', padding: '10px 8px 10px 0px' }}>
                        <CodeField
                            code={code}
                            options={{
                                readOnly: 'nocursor',
                            }}
                        />
                    </div>
                </div>
                <ModalOptions
                    onSave={this._onSave}
                    onClose={this.props.onClose}
                />
            </div>
        )
    }
}

export default connect(
    state => ({
        updateRef: state.template.updateRef,
    }),
)(EditTrigger)