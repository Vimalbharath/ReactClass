const initialState = { b: 1 };

const reducerB = (state = initialState, action) => {
  if (action.type === 'UPDATE_B') {
    return {
      ...state,
      b: action.payload + state.b + 1,
    };
  }
  return state;
};

export default reducerB;
