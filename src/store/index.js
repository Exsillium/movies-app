import { configureStore } from "@reduxjs/toolkit";
// import WishSlice from "./slice/wishList";
import sessionIdSlice from "./slice/sessionId";

const store = configureStore({
	reducer: {
		// wishlist: WishSlice,
		sessionId: sessionIdSlice,
	},
});

export default store;
