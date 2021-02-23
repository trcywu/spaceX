import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Rocket } from './types'

const initialState: Rocket[] = []

const rocketSlice = createSlice({
    name: 'rockets',
    initialState,
    reducers: {
        getRocketsList(state, action: PayloadAction<Rocket[]>) {
            return (state = action.payload)
        },
    },
})

export const { getRocketsList } = rocketSlice.actions

export default rocketSlice.reducer
