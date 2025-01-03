import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import categoriesSlice from "../features/categories/categorySlice";
import mastersSlice from "../features/master/masterSlice";
import ordersSlice from "../features/order/orderSlice";
import workersSlice from "../features/worker/workerSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    categories: categoriesSlice,
    masters: mastersSlice,
    orders: ordersSlice,
    workers: workersSlice,
  },
});

export default store;
