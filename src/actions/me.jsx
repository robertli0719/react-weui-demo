import { http, RestErrorDto } from "../utilities/http"
import { Dispatch } from "redux"
import { store, AppState, Action, UPDATE_ME } from "../Store"
import { UserProfile } from "../reducers/me"
import { hashHistory } from 'react-router'

export function isLogged() {
    const state = store.getState()
    if (state.me && state.me.userTypeName) {
        return true
    }
    return false
}

export function isAdmin() {
    const state = store.getState()
    if (state.me && state.me.userTypeName == "admin") {
        return true
    }
    return false
}

export function isGeneralUser() {
    const state = store.getState()
    if (state.me && state.me.userTypeName == "general") {
        return true
    }
    return false
}

export function isAdminRoot() {
    const state = store.getState()
    if (state.me && state.me.roleList != null) {
        for (const roleName of state.me.roleList) {
            if (roleName == "admin_root") {
                return true
            }
        }
    }
    return false
}

export function isPlatformUser(platformName) {
    const state = store.getState()
    if (state.me && state.me.userPlatformName) {
        return state.me.userPlatformName == platformName
    }
    return false
}

export function updateMe(userProfile) {
    return {
        type: UPDATE_ME,
        payload: userProfile,
        meta: "update userProfile in state"
    }
}

export function loadProfile() {
    return (dispatch) => {
        return http.get("me")
            .then((userProfileDto) => {
                dispatch(updateMe(userProfileDto))
            })
            .catch((restError) => {
                console.log("Error happened when loadProfile:", restError)
                const nullUserProfile = { uid: null, authLabel: null, userTypeName: null, userPlatformName: null, name: null, telephone: null, roleList: null }
                dispatch(updateMe(nullUserProfile))
                throw restError
            })
    }
}

export function triggerLogout() {
    return (dispatch) => {
        return http.delete("me/auth")
            .then(() => {
                return dispatch(loadProfile())
            })
            .catch((restError) => {
                document.cookie = 'access_token_p=; expires=Thu, 01-Jan-70 00:00:01 GMT;'
                console.log("Error happened when deleteAuth:", restError)
            })
    }
}