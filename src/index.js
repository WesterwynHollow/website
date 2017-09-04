import React from 'react';
//External components
import ReactDOM from 'react-dom';
import {
  Router,
  Route,
  Switch} from 'react-router-dom';
import ShopifyBuy from 'shopify-buy';
import ReactModal from 'react-modal';
//Internal components
import createHistory from 'history/createBrowserHistory';
import 'styles/main.css';
import Home from 'pages/Home';
import EddieTheLizard from 'pages/EddieTheLizard';
import registerServiceWorker from './registerServiceWorker';
//Helpers
import {modalStyles} from 'helpers';

ReactModal.defaultStyles = modalStyles;

const history = createHistory();

const client = ShopifyBuy.buildClient({
  accessToken: '4483d81aea85d14a585c1d6f234dd253',
  domain: 'westerwyn-hollow.myshopify.com',
  appId: '6'
});


ReactDOM.render(
  <Router history={history}>
    <Switch>
      <Route exact path={process.env.PUBLIC_URL + '/'} render={routeProps => <Home {...routeProps} />} />
      <Route exact path={process.env.PUBLIC_URL + '/eddie'} render={routeProps => <EddieTheLizard {...routeProps} client={client} />} />
      <Route render={function(){
        return (
          <div className="error">
            <div className="container">
              <div className="grid">
                <div className="col-12 padding">
                  <h1>404 - Page not found</h1>
                </div>
                <div className="col-12">
                  <p>testing</p>
                </div>
              </div>
            </div>
          </div>
        )
      }} />
    </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
