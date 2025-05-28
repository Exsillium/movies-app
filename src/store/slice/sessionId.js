import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("sessionId");

const sessionIdSlice = createSlice({
	name: "sessionId",
	initialState,
	reducers: {
		addSessionId: (state, action) => {
			state = action.payload;
			localStorage.setItem("sessionId", action.payload);
			return state;
		},
		removeSessionId: (state) => {
			state = null;
			localStorage.removeItem("sessionId");
			return state;
		},
	},
});

export const { addSessionId, removeSessionId } = sessionIdSlice.actions;
export default sessionIdSlice.reducer;
