import { Component } from 'react'

export default class ElementItem extends Component {
    render() {
        return (
            <li>{ this.props.content }</li>
        )
    }
}