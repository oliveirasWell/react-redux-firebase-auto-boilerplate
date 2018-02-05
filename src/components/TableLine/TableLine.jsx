import React from "react";

const styles = {
    td: {
        paddingLeft: '10px',
        paddingRight: '10px',
    }
};

export const TableLine = ({dados, index}) => {

    const keys = Object.keys(dados);

    return (
        <tr key={index}>
            {keys.map((key, index) => <td style={styles.td} key={index}> {dados[key]} </td>)}
        </tr>
    );

};
