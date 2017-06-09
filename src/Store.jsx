import { createStore, applyMiddleware, combineReducers, Store } from "redux"
import thunkMiddleware from "redux-thunk"
import { meReducer, UserProfile } from "./reducers/me"

export const UPDATE_FORM = "UPDATE_FORM"
export const DELETE_FORM = "DELETE_FORM"
export const UPDATE_ME = "UPDATE_ME"
export const ADD_NUMBER = "ADD_NUMBER"
export const MARK_FROM_AS_PROCESSING = "MARK_FROM_AS_PROCESSING"
export const UNMARK_FROM_AS_PROCESSING = "UNMARK_FROM_AS_PROCESSING"

const reducer = combineReducers({
    me: meReducer
})

export const store = createStore(reducer, applyMiddleware(thunkMiddleware))