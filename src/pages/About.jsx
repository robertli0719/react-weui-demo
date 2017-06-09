import * as React from "react"
import * as ReactDOM from "react-dom"
import { connect } from "react-redux"
import { AppState } from "../Store"


class AboutPage extends React.Component {

    constructor() {
        super()
    }

    render() {
        const num = this.props.val
        return (
            <div className="container">
                <h1>About us</h1>
                <p>{num}</p>
            </div>
        )
    }
}

function select(state) {
    return { val: state.test.val }
}

export const About = connect(select)(AboutPage)