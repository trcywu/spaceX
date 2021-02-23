import React from 'react'
import axios from 'axios'
import store from 'app/store'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { Rocket } from 'features/rocketsList/types'
import RocketPage from './RocketPage'

jest.mock('axios')

const mockGet = axios.get as jest.Mock

const singleRocket: Rocket = {
    id: '2323',
    name: 'Rocket 1',
    active: true,
    flickr_images: ['www.url.com', 'www.url1.com'],
    height: { meters: 1, feet: 2 },
    mass: { kg: 1, lb: 2 },
    diameter: { meters: 1, feet: 2 },
} as Rocket

describe('RocketPage', () => {
    test('fetches single Rocket from an API based on param and displays them', async () => {
        const mockStore = store()

        const mockRequest = mockGet.mockImplementation(() =>
            Promise.resolve({
                data: singleRocket,
            })
        )

        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/rockets/2323']}>
                    <Route path="/rockets/:id">
                        <RocketPage />
                    </Route>
                </MemoryRouter>
            </Provider>
        )

        const title = await screen.findByText(singleRocket.name)
        expect(title).toBeInTheDocument()
        expect(mockRequest).toHaveBeenCalledWith(
            'https://api.spacexdata.com/v4/rockets/2323'
        )
    })
})
