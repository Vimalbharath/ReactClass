const initialState = {
  items: [],
};

const contactReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_CONTACTS_SUCCESS':
      return { ...state, items: action.payload };
    case 'ADD_CONTACT_SUCCESS':
      return { ...state, items: [...state.items, action.payload] };
    default:
      return state;
  }
};

export default contactReducer;