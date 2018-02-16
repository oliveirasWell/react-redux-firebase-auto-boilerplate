import React from "react";
import Fade from "../Fade/Fade";

export const NoMatch = ({location}) => (
    <Fade in={true}>
        <div className={'center'}>
            <h1>
                404 :'(
            </h1>
            <span>
            Not Found <code>{location.pathname}</code>
        </span>
        </div>
    </Fade>
);