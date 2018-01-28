import React from "react";

export const Line = ({dados, index}) => {

    const keys = Object.keys(dados);

    return (
        <tr key={index}>
            {keys.map((key, index) => <td key={index}> {dados[key]} </td>)}
        </tr>
    );

};