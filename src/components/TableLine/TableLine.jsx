import React from "react";

const styles = {
    td: {
        paddingLeft: '10px',
        paddingRight: '10px',
    }
};

export const TableLine = ({dados, index, style, isHeader}) => {

    const keys = Object.keys(dados);
    const styleOfLine = !!style ? {...styles.td, ...style} : styles.td;
    const Header = isHeader ? 'th' : 'td';
    const itemOfTableLine = keys.map((key, index) => <Header style={styleOfLine} key={index}> {dados[key]} </Header>);

    return (
        <tr key={index}>
            {itemOfTableLine}
        </tr>
    );

};
