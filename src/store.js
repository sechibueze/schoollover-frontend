import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import indexReducer from './_reducers/indexReducer';
const middleware = [ReduxThunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;

 const store = createStore(
  indexReducer,
  composeEnhancers(applyMiddleware(...middleware))
  );
  
export default store;
