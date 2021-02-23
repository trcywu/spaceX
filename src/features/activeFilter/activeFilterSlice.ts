import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum ActiveFilter {
    ShowAll = 'SHOW_ALL',
    ShowActive = 'SHOW_ACTIVE',
}

const initialState = ActiveFilter.ShowAll

const activeFilterSlice = createSlice({
    name: 'activeFilter',
    initialState,
    reducers: {
        setActiveFilter(state, action: PayloadAction<ActiveFilter>) {
            return action.payload
        },
    },
})

export const { setActiveFilter } = activeFilterSlice.actions

export default activeFilterSlice.reducer
