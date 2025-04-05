import { Component } from 'react'
import request from '../../../utils/request';

const elementsUrl = 'http://localhost:3030/data/elements'
export default class ElementItem extends Component {
    constructor(props) {
        super(props)

        this.addToMyListHandler = this.addToMyListHandler.bind(this) // CONTEXT BINDING SO THIS CAN POINT AT THE COMPONENT NOT AT THE BUTTON
    }

    async addToMyListHandler(){
        await request.get(`${elementsUrl}/${this.props.id}`);

        this.props.onSend(this.props.id)
    }

    render() {
        return (
            <li>
                <ul>
                    <li className='elements-item'>{ this.props.content }</li>
                    <li className='elements-item'><button onClick= {this.addToMyListHandler.bind(this)}>Grab!</button></li>
                </ul>
            </li>
        )
    }
}