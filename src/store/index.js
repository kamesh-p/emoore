import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { booksReducer } from "./authSlice";
// import cartReducer from "../component/reducer/cartreducer";
import rootReducer from "../component/reducer";
const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    reducer: rootReducer,
  },
});

export default store;
