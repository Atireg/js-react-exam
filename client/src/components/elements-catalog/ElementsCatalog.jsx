import { Component } from 'react';
import ElementsList from './ElementsList';
import { UserContext } from '../../contexts/UserContext';
import ErrorBoundary from '../error-boundary/ErrorBoundary';

export default class ElementsCatalog extends Component {
    render() {
        return (
            <ErrorBoundary>
                <UserContext.Consumer>
                    {(context) => (
                        <section>
                            <h1>Elements Catalog</h1>
                            <h2>Hello, {context.username}! Harvest your ReUse elements here!</h2>
                            <ElementsList />
                        </section>
                    )}
                </UserContext.Consumer>
            </ErrorBoundary>
        )
    }
}

