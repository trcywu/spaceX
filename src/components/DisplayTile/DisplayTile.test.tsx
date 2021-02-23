import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import DisplayTile from './DisplayTile'
import store from 'app/store'
import { MemoryRouter } from 'react-router-dom'

const testProps = {
    name: 'testName',
    type: 'testType',
    flickrImg: 'www.test.com',
    active: true,
    id: '456',
    pageName: 'testPage',
}

test('render tile', () => {
    const mockStore = store()
    const { asFragment } = render(
        <Provider store={mockStore}>
            <MemoryRouter>
                <DisplayTile {...testProps} />
            </MemoryRouter>
        </Provider>
    )
    expect(asFragment()).toMatchSnapshot()
})
