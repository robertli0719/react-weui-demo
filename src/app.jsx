import * as React from "react"
import * as ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { Router, Route, hashHistory, IndexRoute, RouterState, RedirectFunction } from 'react-router'
import { store } from "./Store"
import * as me from "./actions/me"

// -- Pages --
// defalt pages
import { App } from "./pages/App"
import { Index } from "./pages/Index"
import { About } from "./pages/About"
// import { Me } from "./pages/Me"

function requireRoleGeneral(nextState, replace) {
    if (me.isGeneralUser() == false) {
        replace({
            pathname: "auth/login"
        })
    }
}

const aa = <div>hello,world</div>

const template = (
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" >
                <Route component={App}>
                    <IndexRoute component={Index} />
                    <Route path="index" component={Index} />
                    <Route path="about" component={About} />
                </Route>
                <Route path="auth">
                    {/*<IndexRoute component={Me} />*/}
                </Route>
            </Route>
        </Router>
    </Provider>
)


ReactDOM.render(template, document.getElementById("context"))