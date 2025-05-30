import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	accountData: JSON.parse(localStorage.getItem("accountData")) || [],
};

const WishSlice = createSlice({
	name: "accountData",
	initialState,
	reducers: {
		addaccountData: (state, action) => {
			const existingItem = state.accountData.find(
				(item) => item.id === action.payload.id
			);
			if (!existingItem) {
				state.accountData.push(action.payload);
			}
		},

		removeaccountData: (state, action) => {
			state.accountData = state.accountData.filter(
				(item) => item.id !== action.payload.id
			);
		},
	},
});

export const { addaccountData, removeaccountData } = WishSlice.actions;
export default WishSlice.reducer;
