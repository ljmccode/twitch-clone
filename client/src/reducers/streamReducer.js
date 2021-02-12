import _ from 'lodash'
import { 
    FETCH_STREAM,
    FETCH_STREAMS,
    CREATE_STREAM,
    EDIT_STREAM,
    DELETE_STREAM
} from '../actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')}
        case FETCH_STREAM:
        case CREATE_STREAM:
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload}
        case DELETE_STREAM:
            // omit creates a new state with out the second argument
            return _.omit(state, action.payload)
        default:
            return state;
    }
}