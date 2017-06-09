import * as React from "react"
import * as ReactDOM from "react-dom"
import { hashHistory } from "react-router"
import {
    ButtonArea,
    Button,
    CellsTitle,
    CellsTips,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
    Form,
    FormCell,
    Icon,
    Input,
    Label,
    TextArea,
    Switch,
    Radio,
    Checkbox,
    Select,
    VCode,
    Agreement,
    Toptips
} from "react-weui"

// const {Button, Toast} = WeUi

export class Index extends React.Component {

    constructor(props) {
        super(props)
    }

    show() {

    }

    render() {
        return (
            <div className="container">
                <h1>Hello World~!</h1>
                <Button>hello weui</Button>

                <Form checkbox>
                    <FormCell checkbox>
                        <CellHeader>
                            <Checkbox name="checkbox1" value="1" />
                        </CellHeader>
                        <CellBody>Option 1</CellBody>
                    </FormCell>
                    <FormCell checkbox>
                        <CellHeader>
                            <Checkbox name="checkbox2" value="2" defaultChecked />
                        </CellHeader>
                        <CellBody>Option 2</CellBody>
                    </FormCell>
                    <Cell link>
                        <CellBody>More</CellBody>
                    </Cell>
                </Form>
            </div>
        )
    }
}
