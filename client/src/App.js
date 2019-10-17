import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Landing from './component/layout/Landing'
import Navbar from './component/layout/Navbar'

// Redux
import { Provider ,connect,ReactReduxContext} from 'react-redux';
import store from './store';

import Alert from './component/layout/Alert'
import AddPage from './component/admin/AddPage';
import Page from './component/admin/page/Page'


const App = (props) => {
  
 
   

  return (
   
    <Provider store={store}>
   
      <Router>
      <Fragment>
       <Navbar/>
          <div className="container" style={{'marginTop':'60px'}}>
          <Alert/>
          <Switch>
       
            <Route exact path='/' component={Landing} />
            <Route exact path='/page' component={Page}/>
            <Route exact path='/add-page' component={AddPage} />
          </Switch>
          </div>
       </Fragment>
      </Router>
      
    </Provider>
   
  );
};


export default App