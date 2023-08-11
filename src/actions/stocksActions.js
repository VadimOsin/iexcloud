import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;
export const fetchStocks = (page) => {
    return async (dispatch) => {
        try {
            const response = await axios.get(
                `https://cloud.iexapis.com/v1/stock/market/batch?symbols=aapl,msft,googl&types=quote&token=${API_KEY}`
            );
            const stocks = response.data;

            const totalPages = parseInt(response.headers['x-total-pages']);
            const currentPage = page || 1;

            dispatch({ type: 'FETCH_STOCKS_SUCCESS', payload: { stocks, currentPage, totalPages } });
        } catch (error) {
            dispatch({ type: 'FETCH_STOCKS_ERROR', payload: error.message });
        }
    };
};