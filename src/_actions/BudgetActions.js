import { LOADING, LOADED, baseURL, ADD_ITEM, REMOVE_ITEM, GET_ITEMS, SUBMIT_BUDGET} from './types';
import { setAlert } from './AlertActions';
import { getRequestConfig } from './AuthActions';

export const saveBudgetToLocalStorage = budget => {
    console.log('Saving budget to localStorage', budget)
    try{
      const stringifyBudget = JSON.stringify(budget);
      localStorage.setItem('_budget', stringifyBudget);
    } catch(err) {
      console.log('Failed to stringify budget data')
      // return store.dispatch(setAlert('Failed to stringify budget data', 'ADD_BUDGET'))
    }
  
  }
  
  export const getBudgetFromLocalStorage = () => {
    try {
      const budgetItems = localStorage.getItem('_budget');
      console.log('geting budget from localStorage', budgetItems)
      if(budgetItems === null) return undefined;
      return {
        budget: {
          budgetItems: JSON.parse(budgetItems)
        }
      }
    } catch (error) {
      console.log('Failed to retrieve budget data from localStorage')
      // return store.dispatch(setAlert('Failed to stringify budget data', 'GET_BUDGET'))
    }
  }

  export const addLineItemToBudget = lineItem => dispatch => {
      return dispatch({ type: ADD_ITEM, payload: lineItem})
  }

  export const removeLineItemFromBudget = lineitemId => dispatch => {
      return dispatch({ type: REMOVE_ITEM, payload: lineitemId})
  }
 /*** Get a listing of project budget  */
 export const fetchBudgetItems = (id) => dispatch => {
    dispatch({type: LOADING})
    const requestConfig = getRequestConfig();
    const url = `${baseURL}/api/projects?id=${id}`;

    fetch(url, requestConfig)
        .then(response => {
            if(response.ok) return response.json();

            response.json().then(errorObject => {
                dispatch(setAlert(errorObject.error, GET_ITEMS, 'danger'));
                dispatch({ type: LOADED});
            })
        }).then(data => {
            if(data) {
                const budget = data.data[0].budget.map(lineItem => {
                    return {
                        id: lineItem.id,
                        quantity: lineItem.quantity,
                        unit_cost: lineItem.unit_cost
                    }
                });
                console.log('fetched budget from Db', budget)
                saveBudgetToLocalStorage(budget);
                dispatch({
                    type: GET_ITEMS,
                    payload: budget
                });
                dispatch({ type: LOADED});
            }
        }).catch(err => {

            dispatch(setAlert('Network error', GET_ITEMS));
            dispatch({ type: LOADED });
        })
 }

  /*** Update an existing project */
  export const submitProjectBudget = (payload) => dispatch => {
    dispatch({type: LOADING})
    const requestConfig = getRequestConfig('PUT', payload);
    const url = `${baseURL}/api/projects/${payload._id}/budgets`;

    fetch(url, requestConfig)
        .then(response => {
            if(response.ok) return response.json();

            response.json().then(errorObject => {
                dispatch(setAlert(errorObject.error, SUBMIT_BUDGET, 'danger'));
                dispatch({ type: LOADED});
            })
        }).then(data => {
            if(data) {
                dispatch({
                    type: SUBMIT_BUDGET,
                    payload: data.data
                });
                dispatch(setAlert(data.message, SUBMIT_BUDGET, 'success'));
                dispatch({ type: LOADED});
            }
        }).catch(err => {

            dispatch(setAlert('Network error', SUBMIT_BUDGET));
            dispatch({ type: LOADED });
        })
 }