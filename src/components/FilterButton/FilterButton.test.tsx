import React from 'react'

import { render, screen } from '@testing-library/react'

import FilterButton from './FilterButton'

import { Provider } from 'react-redux'
import store from 'app/store'
import userEvent from '@testing-library/user-event'
import {
    ActiveFilter,
    setActiveFilter,
} from 'features/activeFilter/activeFilterSlice'

const filterButtonProps = {
    activeFilter: ActiveFilter.ShowAll,
    text: 'All',
}

test('the correct text appears on button', () => {
    const mockStore = store()
    render(
        <Provider store={mockStore}>
            <FilterButton {...filterButtonProps} />
        </Provider>
    )

    expect(screen.getByText('All')).toBeInTheDocument()
})

test('dispatches the correct filter', () => {
    const mockStore = store()
    const dispatch = jest.spyOn(mockStore, 'dispatch')
    render(
        <Provider store={mockStore}>
            <FilterButton
                text="Active"
                activeFilter={ActiveFilter.ShowActive}
            />
        </Provider>
    )

    userEvent.click(screen.getByText('Active'))

    expect(dispatch).toBeCalledWith(setActiveFilter(ActiveFilter.ShowActive))
})
