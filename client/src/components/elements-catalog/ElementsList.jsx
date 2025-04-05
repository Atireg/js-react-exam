import { Component } from 'react'
import request from '../../utils/request'
import ElementItem from './element-item/ElementItem';

const elementsUrl = 'http://localhost:3030/data/elements'

export default class ElementsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            elements: [],
        }
    }
    async componentDidMount() {
        const elements = await request.get(elementsUrl);

        this.setState({ elements })
    }

    render() {
        return (
            <ul className='elements-catalog'>
                {this.state.elements.map(element =>
                    <ElementItem
                        key={element._id}
                        id={element._id}
                        content={element.element.material}
                    />
                )}
            </ul>
        )
    }
}