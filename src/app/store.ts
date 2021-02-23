import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './rootReducer'

const createStore = () => {
    const store = configureStore({
        reducer: rootReducer,
    })
    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot.accept('./rootReducer', () => {
            const newRootReducer = require('./rootReducer').default
            store.replaceReducer(newRootReducer)
        })
    }
    return store
}

export default createStore
