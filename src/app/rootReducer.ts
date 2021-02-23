import { combineReducers } from '@reduxjs/toolkit'
import dragons from 'features/dragonsList/dragonSlice'
import rockets from 'features/rockets/rocketSlice'
import activeFilter from 'features/activeFilter/activeFilterSlice'

const rootReducer = combineReducers({ dragons, rockets, activeFilter })

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
