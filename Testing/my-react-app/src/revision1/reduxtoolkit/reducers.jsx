import { createSlice } from "@reduxjs/toolkit"

function myReducer(state,action) {
    switch (action.type){
        case 'INCREMENT':
            return {...state,count:state.count+1}
        case 'DECREMENT':
            return {...state,count:state.count-1}
        default:
            return state
    }
}

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count:0
  },
  reducers: { myReducer},
})



export default counterSlice.reducer;