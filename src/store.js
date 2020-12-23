import { createStore, applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { getBudgetFromLocalStorage, saveBudgetToLocalStorage } from './_actions/BudgetActions';

import indexReducer from './_reducers/indexReducer';
const middleware = [ReduxThunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose ;


 
const store = createStore(
  indexReducer,
  getBudgetFromLocalStorage(),
  composeEnhancers(applyMiddleware(...middleware))
);

store.subscribe(() => saveBudgetToLocalStorage(store.getState().budget.budgetItems))
export default store;
