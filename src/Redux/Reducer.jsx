import { createReducer } from "@reduxjs/toolkit";
import { makingOutEditing } from "./Action";

const initialValue = {
  moreBtn: "",
};

const CrmReducer = createReducer(initialValue, (builder) => {
  builder.addCase(makingOutEditing, (state, action) => {
    state.moreBtn = action.payload;
    
  });
});

export default CrmReducer;
