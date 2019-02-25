import React, { useEffect } from 'react'
import ReactTooltip from 'react-tooltip'

export default function LogicErrors(props) {
    useEffect(() => ReactTooltip.rebuild())

    return (
        <div className="row">
            {props.errors.map((item, index) => (
                <i
                    key={index}
                    className={`${item.icon} logic-alert`}
                    style={{
                        color: item.color,
                        fontSize: item.fontSize,
                    }}
                    data-tip={item.text}
                />
            ))}
        </div>
    )
}