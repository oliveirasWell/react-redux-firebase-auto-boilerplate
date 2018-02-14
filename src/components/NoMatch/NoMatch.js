import React from "react";

export const NoMatch = ({location}) => (
    <div>
        <h3>
            404 :'(
        </h3>
        <span>
            No match for <code>{location.pathname}</code>
        </span>
    </div>
);