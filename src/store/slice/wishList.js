import { createSlice } from "@reduxjs/toolkit"



const initialState = { wishItem: JSON.parse(localStorage.getItem('wishList')) || [] };

const WishSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addWishList: (state, action) => {
            const existingItem = state.wishItem.find(item => item.id === action.payload.id);
            if (!existingItem) {
                state.wishItem.push(action.payload);
            }
        },

        removeWishList: (state, action) => {
            state.wishItem = state.wishItem.filter(item => item.id !== action.payload.id);
        }

            
        
    }
});

export const { addWishList , removeWishList } = WishSlice.actions;
export default WishSlice.reducer;