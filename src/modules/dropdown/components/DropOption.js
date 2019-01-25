import React from 'react'

export default class DropTitle extends React.Component {
    render() {
        const { show, onClick, icon, children, chosen, backgroundColor } = this.props
        if (!show) return null

        return (
            <div
                className="drop-down-menu-option"
                onClick={onClick}
                chosen={chosen ? "true" : "false"}
                style={{
                    backgroundColor: chosen && backgroundColor,
                }}
            >
                <i className={`drop-down-menu-icon ${icon}`}></i>
                {children}
                <i className="mdi mdi-check"/>
            </div>
        )
    }
}