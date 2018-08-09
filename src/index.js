/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerPicsServiceWorker from './registerPicsServiceWorker';
/*eslint-enable */

ReactDOM.render(<App />, document.getElementById('root'));
registerPicsServiceWorker();
