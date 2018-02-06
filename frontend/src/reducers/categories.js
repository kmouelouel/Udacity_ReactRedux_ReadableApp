import { RECEIVE_CATEGORY } from '../actions/constants';

const categories = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_CATEGORY: 
            return action.categories
        default:
            return state;
    }
}

export default categories;
