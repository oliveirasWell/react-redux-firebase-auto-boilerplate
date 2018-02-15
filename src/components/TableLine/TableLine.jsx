import React from "react";

const styles = {
    td: {
        paddingLeft: '10px',
        paddingRight: '10px',
        textAlign: 'center',
    }
};

export const TableLine = ({dados, keys, index, style, isHeader}) => {

    const styleOfLine = !!style ? {...styles.td, ...style} : styles.td;
    const Header = isHeader ? 'th' : 'td';
    const itemOfTableLine = keys.map((key, index) => {
            return !(dados[key] instanceof Array || dados[key] instanceof Object) &&
                <Header style={styleOfLine} key={index}> {dados[key]} </Header>
        }
    );

    return (
        <tr key={index}>
            {itemOfTableLine}
        </tr>
    );

};
