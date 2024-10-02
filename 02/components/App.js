// ./src/components/App.js
import React from 'react';
import Box from './Box';
import TextContext from '../context';

class App extends React.Component {
    state = {
        text: 'React HelloWorld Modern!',
    };

    render() {
        const { text } = this.state;
        const { Provider: TextProvider } = TextContext;

        return (
            <TextProvider value={text}>
                <Box />
            </TextProvider>
        );
    }
}

export default App;
