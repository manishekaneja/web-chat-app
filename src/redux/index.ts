// import { applyMiddleware, createStore } from "redux";
// import { persistReducer } from "redux-persist";
// import persistStore from "redux-persist/es/persistStore";
// import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
// import thunk from "redux-thunk";
// import rootReducer from "./rootReducer";

// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(persistedReducer, applyMiddleware(thunk));

// let persistor = persistStore(store);
// store.subscribe(() => {
//   console.log(JSON.stringify(store.getState(), null, 2));
// });
// export type AppDispatch = typeof store.dispatch;
// export default store;
// export { persistor };
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => {
  // console.log(JSON.stringify(store.getState(), null, 2));
});
export type AppDispatch = typeof store.dispatch;
export default store;
