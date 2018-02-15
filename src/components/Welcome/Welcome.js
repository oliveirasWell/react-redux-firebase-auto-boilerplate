import {links, routesToPrint} from '../../utils/routes';
import React from "react";
import {Link} from "react-router-dom";

class Welcome extends React.Component {
    render() {

        return <div className={'center'}>
            <h1>Welcome</h1>
            <nav>
                {
                    Object.keys(links).map(key => {
                        if (routesToPrint.includes(key)) {
                            return <Link className="welcome-link" to={links[key]}
                                         style={{display: 'flex', textDecoration: 'none'}}>{key}</Link>
                        }
                    })
                }
            </nav>
        </div>;
    };

}

export default Welcome;