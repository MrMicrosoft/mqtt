import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {MuiThemeProvider, createMuiTheme, } from '@material-ui/core/styles'
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './Reducers';
import {Connector} from 'mqtt-react';

const theme = createMuiTheme({
    palette: {
        type: 'light'
    }
});

injectTapEventPlugin();

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <BrowserRouter>
            <Provider store={store}>
                <Connector mqttProps={{
                    host: '192.168.1.2',
                    port: '9001'
                }}>
                    <App />
                </Connector>
            </Provider>
        </BrowserRouter>
    </MuiThemeProvider>,

    document.getElementById('root'));
registerServiceWorker();
