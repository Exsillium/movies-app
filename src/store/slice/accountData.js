import { createSlice } from "@reduxjs/toolkit";

let initialState = null;

/*
{
	avatar: {
		gravatar: { hash: "ed4768a1ed34dcb1b1b2f9a222608a05" },
		tmdb: { avatar_path: null },
	},
	id: 20523335,
	iso_639_1: "ar",
	iso_3166_1: "EG",
	name: "",
	include_adult: false,
	username: "waseem",
};
 */

try {
	initialState = JSON.parse(localStorage.getItem("accountData"));
} catch (error) {
	initialState = null;
}

const accountDataSlice = createSlice({
	name: "accountData",
	initialState,
	reducers: {
		updateAccountData: (state, action) => {
			state = action.payload;
			localStorage.setItem("accountData", JSON.stringify(state));
			return state;
		},

		removeAccountData: (state, action) => {
			state = null;
			localStorage.removeItem("accountData");
			return state;
		},
	},
});

export const { updateAccountData, removeAccountData } =
	accountDataSlice.actions;
export default accountDataSlice.reducer;
