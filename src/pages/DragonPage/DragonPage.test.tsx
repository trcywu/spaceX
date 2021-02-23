import React from 'react'
import axios from 'axios'
import store from 'app/store'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import DragonPage from './DragonPage'
import { Dragon } from 'features/dragonsList/types'
import { render, screen } from '@testing-library/react'

jest.mock('axios')

const mockGet = axios.get as jest.Mock

const singleDragon: Dragon = {
    id: '2323',
    name: 'Dragon 1',
    active: true,
    flickr_images: ['www.url.com', 'www.url1.com'],
    height_w_trunk: { meters: 11, feet: 12 },
    diameter: { meters: 11, feet: 12 },
    launch_payload_mass: { kg: 11, lb: 12 },
    launch_payload_vol: { cubic_meters: 1, cubic_feet: 2 },
} as Dragon

describe('DragonPage', () => {
    test('fetches single dragon from an API based on param and displays them', async () => {
        const mockStore = store()
        const mockRequest = mockGet.mockImplementation(() =>
            Promise.resolve({
                data: singleDragon,
            })
        )

        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/dragons/2323']}>
                    <Route path="/dragons/:id">
                        <DragonPage />
                    </Route>
                </MemoryRouter>
            </Provider>
        )

        const title = await screen.findByText(singleDragon.name)
        expect(title).toBeInTheDocument()
        expect(mockRequest).toHaveBeenCalledWith(
            'https://api.spacexdata.com/v4/dragons/2323'
        )
    })
})
