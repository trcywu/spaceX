import React from 'react'
import store from 'app/store'

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import HomePage from './HomePage'

test('renders the correct text in h1', () => {
    const mockStore = store()
    render(
        <Provider store={mockStore}>
            <HomePage />
        </Provider>
    )

    expect(screen.getByText("SpaceX's Rockets and Dragons")).toBeInTheDocument()
})

test('renders the correct img', () => {
    const mockStore = store()
    render(
        <Provider store={mockStore}>
            <HomePage />
        </Provider>
    )

    expect(screen.getByAltText('space x background')).toBeInTheDocument()
})
