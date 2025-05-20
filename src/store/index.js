import { configureStore } from '@reduxjs/toolkit'
import WishSlice from './slice/wishList'

const store = configureStore({
    reducer: {
        wishlist:WishSlice
    },
})

export default store