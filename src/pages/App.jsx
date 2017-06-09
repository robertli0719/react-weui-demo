import * as React from "react"
import { connect } from "react-redux"
import { Router, Route, hashHistory, IndexRoute, RouterState, RedirectFunction } from 'react-router'
import * as me from "../actions/me"
import { UserProfile } from "../reducers/me"
import { store, AppState } from "../Store"

import 'weui'
import 'react-weui/lib/react-weui.min.css'

const navBarItemList = [
    { name: "Index", url: "/index" },
    { name: "About", url: "/about" },
]

class AppPage extends React.Component {

    constructor() {
        super()
    }

    logout() {
        store.dispatch(me.triggerLogout()).then(() => {
            hashHistory.replace("/")
        })
    }

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

function select(state) {
    return { me: state.me }
}

export const App = connect(select)(AppPage)