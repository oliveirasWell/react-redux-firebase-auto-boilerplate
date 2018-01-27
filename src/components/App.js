import React, {Component} from 'react';

const styles = {
    container: {
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ddd',
        fontFamily: 'sans-serif',
    },
};

class App extends Component {
    render() {
        return (
            <div className="App" style={styles.container}>
                Meu primeiro app react!
            </div>
        );
    }
}

export default App;
