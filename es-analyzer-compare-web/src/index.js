import React from 'react';
import ReactDOM from 'react-dom';
import { hotjar } from 'react-hotjar';
import './index.css';
import App from './containers/App';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

/* jshint ignore:start */
const NoMatch = ({ location }) => (
  <div>
    <h3>
      Wrong path for <code>{location.pathname}</code>
    </h3>
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} />
      <Route component={NoMatch} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);

/* jshint ignore:end */
registerServiceWorker();
