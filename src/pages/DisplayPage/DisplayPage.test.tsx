import React from 'react'
import axios from 'axios'
import { Rocket } from 'features/rockets/types'
import store from 'app/store'
import { Provider } from 'react-redux'
import { MemoryRouter, Route } from 'react-router-dom'
import DisplayPage from './DisplayPage'
import { Dragon } from 'features/dragonsList/types'
import { render, screen } from '@testing-library/react'
import { getRocketsList } from 'features/rockets/rocketSlice'
import userEvent from '@testing-library/user-event'
import { getDragonsList } from 'features/dragonsList/dragonSlice'
import {
    ActiveFilter,
    setActiveFilter,
} from 'features/activeFilter/activeFilterSlice'

jest.mock('axios')

const mockGet = axios.get as jest.Mock

const testRockets: Rocket[] = [
    {
        id: '123',
        name: 'Rocket 1',
        active: true,
        flickr_images: ['www.url.com', 'www.url1.com'],
    },
    {
        id: '456',
        name: 'Rocket 2',
        active: false,
        flickr_images: ['www.url.com', 'www.url1.com'],
    },
] as Rocket[]

const testDragons: Dragon[] = [
    {
        id: '2323',
        name: 'Rocket 1',
        active: true,
        flickr_images: ['www.url.com', 'www.url1.com'],
    },
    {
        id: '4343',
        name: 'Rocket 2',
        active: false,
        flickr_images: ['www.url.com', 'www.url1.com'],
    },
] as Dragon[]

describe('DisplayPage', () => {
    test('fetches rockets from an API based on param and displays them', async () => {
        const mockStore = store()
        const mockRequest = mockGet.mockImplementation(() =>
            Promise.resolve({ data: testRockets })
        )

        const dispatch = jest.spyOn(mockStore, 'dispatch')

        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/rockets']}>
                    <Route path="/:name">
                        <DisplayPage />
                    </Route>
                </MemoryRouter>
            </Provider>
        )

        const items = await screen.findAllByTestId('display-tile')
        expect(items).toHaveLength(2)
        expect(mockRequest).toHaveBeenCalledWith(
            'https://api.spacexdata.com/v4/rockets'
        )
        expect(screen.getByText('Rockets')).toBeInTheDocument()
        expect(dispatch).toHaveBeenCalledWith(getRocketsList(testRockets))
    })
    test('displays dragons only with an active status', async () => {
        const mockStore = store()
        const mockRequest = mockGet.mockImplementationOnce(() =>
            Promise.resolve({ data: testDragons })
        )

        const dispatch = jest.spyOn(mockStore, 'dispatch')
        render(
            <Provider store={mockStore}>
                <MemoryRouter initialEntries={['/dragons']}>
                    <Route path="/:name">
                        <DisplayPage />
                    </Route>
                </MemoryRouter>
            </Provider>
        )

        const items = await screen.findAllByTestId('display-tile')
        expect(items).toHaveLength(2)
        expect(mockRequest).toHaveBeenCalledWith(
            'https://api.spacexdata.com/v4/dragons'
        )
        expect(screen.getByText('Dragons')).toBeInTheDocument()
        expect(dispatch).toHaveBeenCalledWith(getDragonsList(testDragons))

        userEvent.click(screen.getByText('Active'))
        expect(dispatch).toHaveBeenCalledWith(
            setActiveFilter(ActiveFilter.ShowActive)
        )
        const activeItems = screen.getAllByTestId('display-tile')
        expect(activeItems).toHaveLength(1)
    })
})
