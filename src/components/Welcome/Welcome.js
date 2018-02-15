import {routes, routesToPrint} from '../../utils/routes';
import React from "react";
import {Link} from "react-router-dom";

class Welcome extends React.Component {
    render() {

        return <div>
            <h1>Welcome</h1>
            <nav>
                {
                    Object.keys(routes).map(key => {
                        if (routesToPrint.includes(key)) {
                            return <Link to={routes[key]} style={{color: 'black', display: 'flex'}}>{key}</Link>
                        }
                    })
                }
            </nav>
        </div>;
    };

}

export default Welcome;