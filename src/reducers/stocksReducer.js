const initialState = {
    stocks: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
};

const stocksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_STOCKS_SUCCESS':
            return {
                ...state,
                stocks: action.payload.stocks,
                loading: false,
                error: null,
                currentPage: action.payload.currentPage,
                totalPages: action.payload.totalPages,
            };
        case 'FETCH_STOCKS_ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default stocksReducer;