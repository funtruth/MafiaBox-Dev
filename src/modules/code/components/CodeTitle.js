import React from 'react'

class CodeCollapsed extends React.Component {
    _onExpand = e => {
        if (e.target.classList.contains('code-option')) return;
        this.props.toggleCode()
    }

    render() {
        const { source, subsource } = this.props
        
        return (
            <div
                className="code-collapsed"
                onClick={this._onExpand}
            >
                <div className="code-title">
                    <div className="code-source">{source}</div>
                    <div className="code-subsource">{subsource}</div>
                </div>
                <i className="mdi mdi-close code-option" onClick={this.props.removeCode} style={{marginLeft: 'auto'}}></i>
            </div>
        )
    }
}

export default CodeCollapsed