import {socialLinks} from "../../utils/staticLinks";
import FontAwesome from 'react-fontawesome';
import React from "react";

const styles = {
    socialLinks: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        alignSelf: 'flex-end',
    },
    a: {
        marginRight: '5px',
        color: '#566b78'
    },
};

export const Footer = () => <footer>
    <div style={styles.socialLinks}>
        <a style={styles.a} href={socialLinks.github}><FontAwesome name='github' size={'2x'}/></a>
    </div>
</footer>;