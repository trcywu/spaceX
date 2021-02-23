import React from 'react'
import store from 'app/store'

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import TechnicalInfoBox from './TechnicalInfoBox'

test('renders the correct name in alt tag', () => {
    const mockStore = store()
    render(
        <Provider store={mockStore}>
            <TechnicalInfoBox>
                <p>hello world</p>
            </TechnicalInfoBox>
        </Provider>
    )

    expect(screen.getByText('hello world')).toBeInTheDocument()
})
