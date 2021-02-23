import React from 'react'
import store from 'app/store'

import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import GridCarousel from './GridCarousel'

const testImages = ['www.scooby.com', 'www.doo.com']
const testName = 'puppy'

test('renders the correct name in alt tag', () => {
    const mockStore = store()
    render(
        <Provider store={mockStore}>
            <GridCarousel images={testImages} name={testName} />
        </Provider>
    )
    const images = screen.getAllByAltText('puppy')
    expect(images).toHaveLength(2)
})
