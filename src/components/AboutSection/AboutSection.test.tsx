import React from 'react'
import store from 'app/store'

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import AboutSection from './AboutSection'

const testProps = {
    name: 'KFC',
    description: 'yummy goodness',
}

test('renders the correct name in h2', () => {
    const mockStore = store()
    render(
        <Provider store={mockStore}>
            <AboutSection {...testProps} />
        </Provider>
    )

    expect(screen.getByText('About KFC')).toBeInTheDocument()
})

test('renders the correct description', () => {
    const mockStore = store()
    render(
        <Provider store={mockStore}>
            <AboutSection {...testProps} />
        </Provider>
    )

    expect(screen.getByText('yummy goodness')).toBeInTheDocument()
})
