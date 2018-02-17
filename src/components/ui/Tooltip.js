import React from "react";
import './Tooltip.css';

//FIXME this shit overlaps absolute divs
export const Tooltip = (props) => {
    return <div className="tooltip" style={props.style}>
        {props.children}
        <span className="tooltiptext">{props.text}</span>
    </div>
};