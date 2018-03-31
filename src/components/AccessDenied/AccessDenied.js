import {routes} from '../../utils/custom/routes';
import React from "react";
import {Link} from "react-router-dom";
import './AccessDenied.css';

const styles = {link: {display: 'flex', textDecoration: 'none'}};

class Welcome extends React.Component {
    render() {
        return <div className={'center'}>
            <h1>Access Denied</h1>
            <nav>
                <nav>You are trying to go when you haven't access :)</nav>
                <Link className="access-denied-link" to={routes.welcome} style={styles.link}> Return to home</Link>
            </nav>
        </div>;
    };

}

export default Welcome;