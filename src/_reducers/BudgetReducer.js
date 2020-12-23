
import {
    ADD_ITEM,
    GET_ITEMS,
    REMOVE_ITEM,
    SUBMIT_BUDGET,

} from '../_actions/types';

const initialState = {
    budgetItems: [],
    budgetSubmission: null,
}
export default (state = initialState, action) => {
    const { type, payload} = action;
    switch (type) {
        case ADD_ITEM:
            return {
                ...state, 
                budgetItems: [...state.budgetItems, payload ]
            }
        case GET_ITEMS:
            return {...state, budgetItems: payload}
        case REMOVE_ITEM:
            return {
                ...state,
                budgetItems: state.budgetItems.filter(lineItem => lineItem.id !== payload )
            }
        case SUBMIT_BUDGET:
            return {
                ...state,
                budgetSubmission: payload
            }
        default:
            return state;
    }
}