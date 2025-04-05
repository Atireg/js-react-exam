import { Component } from 'react';
import ElementsList from './ElementsList';

export default class ElementsCatalog extends Component {
    render() {
        return (
            <>
                <h1>Elements Catalog</h1>
               <ElementsList />
            </>
        )
    }
}

