import { Component } from 'react'
import request from '../../../utils/request';

const elementsUrl = 'http://localhost:3030/data/elements'
export default class ElementItem extends Component {

    async addToMyListHandler(){
        const result = await request.get(`${elementsUrl}/${this.props.id}`);
        console.log(result);
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