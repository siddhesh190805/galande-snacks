import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

// Cart actions
const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    LOAD_CART: 'LOAD_CART',
};

// Cart reducer
function cartReducer(state, action) {
    switch (action.type) {
        case CART_ACTIONS.ADD_ITEM: {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }

            return {
                ...state,
                items: [...state.items, { ...action.payload, quantity: 1 }],
            };
        }

        case CART_ACTIONS.REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };

        case CART_ACTIONS.UPDATE_QUANTITY: {
            if (action.payload.quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.id !== action.payload.id),
                };
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id
                        ? { ...item, quantity: action.payload.quantity }
                        : item
                ),
            };
        }

        case CART_ACTIONS.CLEAR_CART:
            return {
                ...state,
                items: [],
            };

        case CART_ACTIONS.LOAD_CART:
            return {
                ...state,
                items: action.payload,
            };

        default:
            return state;
    }
}

// Calculate totals
function calculateTotals(items) {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return { totalItems, totalPrice };
}

// Initial state
const initialState = {
    items: [],
};

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('galande-cart');
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
            } catch (e) {
                console.error('Failed to load cart:', e);
            }
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('galande-cart', JSON.stringify(state.items));
    }, [state.items]);

    const addItem = (product) => {
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
    };

    const removeItem = (productId) => {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
    };

    const { totalItems, totalPrice } = calculateTotals(state.items);

    const value = {
        items: state.items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
