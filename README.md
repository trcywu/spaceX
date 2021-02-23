# Run the project

In the project directory, you can:

-   Clone the repo
-   Run yarn in the root directory
-   Run yarn start and navigate to http://localhost:3000

# Tech Stack:

-   React
-   Redux Toolkit
-   TypeScript
-   React-router
-   Styled-components
-   Axios for fetching data
-   React testing library
-   Material UI

# Architecture Decision Record

-   This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app)
-   Redux toolkit allows for a cut down in boilerplate to set up a store, reducers and actions
-   For simplicity and because this is a small project, async fetching is made independent of Redux. For larger projects, Redux Thunk or Redux Saga should be considered to handle side effects.
-   Styled-components allows for css-in-js
-   React testing library provides good unit test coverage and tests components the way a user would use them. For larger projects Cypress should be considered for thorough e2e testing
-   Feature design and testing was prioritised over styling in this project
-   Approach to data visualisation: as this was a data-heavy API, styling was time-boxed to provide simple examples of each of the below which I believe should be considered

1. Semantic HTML to give meaning of content on page and also better accessibility
2. Use of Grids, Tables to allow for grouping of data
3. Understanding the needs of the user and the call to action of the page
