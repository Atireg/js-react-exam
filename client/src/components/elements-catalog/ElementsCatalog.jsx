import { Component } from 'react';
import ElementsList from './ElementsList';
import { UserContext } from '../../contexts/UserContext';

export default class ElementsCatalog extends Component {
    render() {
        return (
            <UserContext.Consumer>
                {(context) => (
                    <section>
                        <h1>Elements Catalog</h1>
                        <h2>Hello, {context.username}! Harvest your ReUse elements here!</h2>
                        <ElementsList />
                    </section>
                )}
            </UserContext.Consumer>
        )
    }
}

