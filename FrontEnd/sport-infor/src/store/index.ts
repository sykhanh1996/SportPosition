import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { mainReducer } from "./Main/reducers";
import thunkMiddleware from 'redux-thunk';


const rootReducer = combineReducers({
  main: mainReducer
});


export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore() {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  

  return createStore(rootReducer, middlewareEnhancer);
};