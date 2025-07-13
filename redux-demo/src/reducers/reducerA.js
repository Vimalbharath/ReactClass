const initialState = { a: 1 };

const reducerA = (state = initialState, action) => {
  if (action.type === 'UPDATE_A') {
    return {
      ...state,
      a: state.a + action.payload + 1,
    };
  }
  return state;
};

export default reducerA;
