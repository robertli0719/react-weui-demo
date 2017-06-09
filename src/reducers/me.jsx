import { Action, UPDATE_ME } from "../Store"

const initState = {
    uid: null,
    authLabel: null,
    userTypeName: null,
    userPlatformName: null,
    name: null,
    telephone: null,
    roleList: null
}

export function meReducer(state = initState, action) {
    switch (action.type) {
        case UPDATE_ME:
            state = $.extend({}, state, action.payload)
        default:
            return state
    }
}