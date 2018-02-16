import {links, routesToPrint} from '../../utils/routes';
import React from "react";
import {Link} from "react-router-dom";

const styles = {link: {display: 'flex', textDecoration: 'none'}};

class Welcome extends React.Component {
    render() {

        const linksList = Object.keys(links)
            .map((key, index) => routesToPrint.includes(key)
                ? <Link key={index} className="welcome-link" to={links[key]} style={styles.link}>{key}</Link>
                : null
            );

        return <div className={'center'}>
            <h1>Welcome</h1>
            <nav>
                {linksList}
            </nav>
        </div>;
    };

}

export default Welcome;