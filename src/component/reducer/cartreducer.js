const initialState = {
  cartItem: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartItem: [...state.cartItem, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItem: state.cartItem.filter(
          (item, index) => index !== action.payload
        ),
      };

    default:
      return state;
  }
};

export const addToCart = (item) => ({
  type: "ADD_TO_CART",
  payload: item,
});

export const removeFromCart = (index) => ({
  type: "REMOVE_FROM_CART",
  payload: index,
});

export default cartReducer;
