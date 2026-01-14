import { createSlice } from "@reduxjs/toolkit"

// Helper function lấy dữ liệu từ LocalStorage
const getInitialCart = () => {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        return [];
    }
};

const initialState = {
    cart: getInitialCart(),
}

const cartSlice = createSlice({
    name: 'cartState',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            
            const existingItem = state.cart.find(item => 
                item.id === product.id
            );

            if (existingItem) {
                const addedQty = product.quantity || 1;
                existingItem.quantity += addedQty;
                
                existingItem.subTotal = existingItem.quantity * existingItem.price;
            } else {
                const qty = product.quantity || 1;

                let calculatedOriginalPrice = product.price;
                if(product.discount > 0) {
                     calculatedOriginalPrice = product.price / (1 - product.discount / 100);
                }

                const newItem = {
                    id: product.id,
                    slug: product.slug,
                    name: product.name,
                    thumbnail: product.thumbnail,
                    
                    price: product.price,
                    originalPrice: calculatedOriginalPrice,
                    discount: product.discount || 0,
                    
                    quantity: qty,
                    subTotal: qty * product.price 
                };

                state.cart.push(newItem);
            }

            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => 
                item.id !== action.payload.id
            );
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        updateQuantity: (state, action) => {
            const item = state.cart.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
                item.subTotal = item.quantity * item.price;
                
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },

        clearCart: (state) => {
            state.cart = [];
            localStorage.removeItem('cart');
        },
    }
})

// --- EXPORT ACTIONS & SELECTORS ---

export const { 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
} = cartSlice.actions;

export const countCartItems = (state) => state.cartState?.cart?.length || 0;

export const selectCartItems = (state) => state.cartState?.cart || [];

export const selectCartTotal = (state) => 
    state.cartState.cart.reduce((total, item) => total + (item.subTotal || 0), 0);

export const selectTotalQuantity = (state) => 
    state.cartState.cart.reduce((sum, item) => sum + (item.quantity || 0), 0);

export default cartSlice.reducer;