import React from "react";
import {Transition} from "react-transition-group";

const duration = 500;

const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    padding: 20,
};

const transitionStyles = {
    entering: {opacity: 0},
    entered: {opacity: 1},
};

export default class Fade extends React.Component {
    render() {
        return <Transition in={this.props.in} timeout={duration}>
            {(state) => (
                <div style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                }}>
                    {this.props.children}
                </div>
            )}
        </Transition>
    }
}
