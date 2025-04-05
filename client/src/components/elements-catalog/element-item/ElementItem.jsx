import { Component } from 'react'
// import request from '../../../utils/request';
import withAuth from '../../hoc/withAuth';

const elementsUrl = 'http://localhost:3030/data/elements'
class ElementItem extends Component {
    constructor(props) {
        super(props)

        this.addToMyListHandler = this.addToMyListHandler.bind(this) // CONTEXT BINDING SO THIS CAN POINT AT THE COMPONENT NOT AT THE BUTTON
    }

    async addToMyListHandler(){
        // await request.get(`${elementsUrl}/${this.props.id}`);
        await this.props.auth.request.get(`${elementsUrl}/${this.props.id}`);

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

const ElementItemWithAuth = withAuth(ElementItem);

export default ElementItemWithAuth