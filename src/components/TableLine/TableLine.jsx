import React from "react";
import FontAwesome from 'react-fontawesome';

const styles = {
    td: {
        paddingLeft: '10px',
        paddingRight: '10px',
        textAlign: 'center',
    },
    marginRight: {
        marginRight: '15px',
        marginLeft: '15px'
    },
    actions: {
        display: 'flex',
        cursor: 'pointer',
    }
};

export const TableLine = ({data, keys, index, style, isHeader, removeMethod, editMethod}) => {
    const styleOfLine = {...(!!style ? {...styles.td, ...style} : styles.td)};
    const LineTipeComponent = isHeader ? 'th' : 'td';

    const actions = (keyOfItem) => <div style={{...(!isHeader ? styles.actions : null)}}>
        <div style={styles.marginRight} onClick={() => removeMethod(keyOfItem)}>
            <FontAwesome name='trash'/> Remove
        </div>
        <div style={styles.marginRight} onClick={() => editMethod(keyOfItem)}>
            <FontAwesome name='pencil'/> Edit
        </div>
    </div>;

    const getItemOrTrueIfTrue = (item) => {
        if (item === true) {
            return 'true';
        } else if (item === false) {
            return 'false';
        } else {
            return item
        }
    };

    const lineContent = (key) => {
        if (key !== 'actions') {
            return getItemOrTrueIfTrue(data[key]);
        } else if (isHeader) {
            return 'actions';
        } else {
            return actions(data['.key']);
        }
    };

    return (
        <tr key={!!data['.key'] ? data['.key'] : index} className={isHeader ? "header" : ""}>
            {
                [...keys, {key: 'actions'}]
                    .filter(key => !(key.type === 'array' || data[key.key] instanceof Array || data[key.key] instanceof Object))
                    .map((key, index) => <LineTipeComponent style={styleOfLine} key={index}> {lineContent(key.key)}</LineTipeComponent>)
            }
        </tr>
    );

};
