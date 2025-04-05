import { Component } from 'react'
import request from '../../utils/request'
import ElementItem from './element-item/ElementItem';
import withFilter from '../hoc/withFilter';

const elementsUrl = 'http://localhost:3030/data/elements'

class ElementsList extends Component {
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

    sendToBasket(elementId){
        console.log('Send to basket!', elementId);
    }

    render() {
        // THIS ONLY TO SIMULATE AN ERROR
        // if(Math.random() < 0.5){
        //     throw new Error('Rendering bug!')
        // }

        return (
            <ul className='elements-catalog'>
                {this.state.elements.map(element =>
                    <ElementItem
                        key={element._id}
                        id={element._id}
                        content={element.element.material}
                        onSend={this.sendToBasket}
                    />
                )}
            </ul>
        )
    }
}

const ElementsListWithFilter = withFilter(ElementsList);

export default ElementsListWithFilter