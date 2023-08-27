import axios from "axios";

// Action Types
const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
const CANCEL_RENTAL_SUCCESS = "CANCEL_RENTAL_SUCCESS";

// Initial State
const initialState = {
  books: [],
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return { ...state, books: action.payload };
    case CANCEL_RENTAL_SUCCESS:
      return {
        ...state,
        books: state.books.filter((book) => book._id !== action.payload),
      };
    default:
      return state;
  }
};

// Actions
export const fetchBooks = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/library/");
    dispatch({ type: FETCH_BOOKS_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};

export const cancelRental = (bookId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:4000/library/${bookId}`);
    dispatch({ type: CANCEL_RENTAL_SUCCESS, payload: bookId });
  } catch (error) {
    console.error("Error canceling rental:", error);
  }
};

export default reducer;
