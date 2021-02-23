import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Dragon } from './types'

const initialState: Dragon[] = []

const dragonSlice = createSlice({
    name: 'dragons',
    initialState,
    reducers: {
        getDragonsList(state, action: PayloadAction<Dragon[]>) {
            return (state = action.payload)
        },
    },
})

export const { getDragonsList } = dragonSlice.actions

export default dragonSlice.reducer
