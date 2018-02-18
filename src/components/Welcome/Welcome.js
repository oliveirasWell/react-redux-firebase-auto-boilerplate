import {routes} from '../../utils/custom/routes';
import React from "react";
import {Link} from "react-router-dom";
import './Welcome.css';
import {nodes} from "../../utils/custom/nodes";

const styles = {link: {display: 'flex', textDecoration: 'none'}};

class Welcome extends React.Component {
    render() {
        return <div className={'center'}>
            <h1>Welcome</h1>
            <nav>
                {
                    [{name: 'Welcome', pathToMainLink: routes.welcome}, ...Object.values(nodes)].map(
                        (node, index) =>
                            !!node.pathToMainLink
                                ? <Link key={index} className="welcome-link" to={node.pathToMainLink} style={styles.link}>{node.name}</Link>
                                : null
                    )
                }
            </nav>
        </div>;
    };

}

export default Welcome;