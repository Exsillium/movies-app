import { configureStore } from "@reduxjs/toolkit";
// import WishSlice from "./slice/wishList";
import sessionIdSlice from "./slice/sessionId";
import accountDataSlice from "./slice/accountData";

const store = configureStore({
	reducer: {
		// wishlist: WishSlice,
		sessionId: sessionIdSlice,
		accountData: accountDataSlice,
	},
});

export default store;
