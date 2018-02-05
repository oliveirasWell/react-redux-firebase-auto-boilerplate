import React from 'react';
import Logout from "../Logout/Logout";

export const Header = (props) => <div style={{textAlign: 'right'}}>
    {!!props.store.getState() && <span>{props.store.getState().displayName} <Logout store={props.store}/></span>}
</div>;