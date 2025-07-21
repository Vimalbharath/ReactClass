const initialState = {
  items: [],
  loading: false,
  error: null,
};

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_BOOKS_SUCCESS':
      return { ...state, items: action.payload };
    case 'ADD_BOOK_SUCCESS':
      return { ...state, items: [...state.items, action.payload] };
    case 'DELETE_BOOK_SUCCESS': 
      return {
        ...state,
        items: state.items.filter(book => book.id !== action.payload),
      };
    case 'UPDATE_BOOK_SUCCESS': 
      return {
        ...state,
        items: state.items.map(book =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    default:
      return state;
  }
};

export default bookReducer;