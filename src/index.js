import React from 'react';
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store'

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
