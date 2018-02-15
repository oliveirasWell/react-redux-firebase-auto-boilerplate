import React from "react";
import Fade from "../Fade/Fade";

export const NoMatch = ({location}) => (
    <Fade in={true}>
        <React.Fragment>
            <h3>
                404 :'(
            </h3>
            <span>
            Not Found <code>{location.pathname}</code>
        </span>
        </React.Fragment>
    </Fade>
);