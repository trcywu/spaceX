import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './app/App'
import { Provider } from 'react-redux'
import store from './app/store'

ReactDOM.render(
    <Provider store={store()}>
        <App />
    </Provider>,
    document.getElementById('root')
)

// if (process.env.NODE_ENV === 'development' && module.hot) {
//     module.hot.accept('./app/App', render())
// }
