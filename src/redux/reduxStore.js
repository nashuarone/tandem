import { combineReducers, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk"
import dialogsReducer from "./dialogsReducer";
import profileReducer from "./profileReducer";
import coursesReducer from "./coursesReducer"

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  coursesPage: coursesReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

export default store
