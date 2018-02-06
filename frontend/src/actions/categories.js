import * as API from '../utils/api';
import { RECEIVE_CATEGORY } from './constants'

export const receiveCategory = (categories) => ({
    type: RECEIVE_CATEGORY,
    categories
});

export const fetchCategory = () => (dispatch) =>
    API.getCategories().then(categories =>
        dispatch(receiveCategory(categories))
    );
