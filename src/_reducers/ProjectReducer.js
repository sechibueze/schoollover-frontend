
import {
    CREATE_PROJECT,
    GET_PROJECT_LIST,
    UPDATE_PROJECT_DATA,
    RESET_PROJECT_DATA,
    DELETE_PROJECT,
    TOGGLE_PROJECT_VISIBILITY
} from '../_actions/types';

const initialState = {
    projects: [],
    budget: [],
    projectData: null,
    projectDelta: null,
    visibilityStatus: null,
}
export default (state = initialState, action) => {
    const { type, payload} = action;
    switch (type) {
        case CREATE_PROJECT:
        case UPDATE_PROJECT_DATA:
        case DELETE_PROJECT:
            return {...state, projectDelta: payload}
        case GET_PROJECT_LIST:
            return {...state, projects: payload}
        case RESET_PROJECT_DATA:
            return {...state, projectData: null, projectDelta: null}
        case TOGGLE_PROJECT_VISIBILITY:
            return {...state, projectData: null, visibilityStatus: payload}
    
        default:
            return state;
    }
}