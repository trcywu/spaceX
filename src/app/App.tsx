import React, { FC } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import DisplayPage from 'pages/DisplayPage/DisplayPage'
import DragonPage from 'pages/DragonPage/DragonPage'
import RocketPage from 'pages/RocketPage/RocketPage'
import logo from 'assets/logo.png'
import HomePage from 'pages/HomePage/HomePage'

const StyledPageLayout = styled.div`
    max-width: 1200px;
    margin: 0px auto;
`

const StyledMenuBar = styled.nav`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    padding: 15px 0;
`

const StyledLink = styled(Link)`
    padding-left: 20px;
    width: 100px;
`

const App: FC = () => {
    return (
        <Router>
            <StyledPageLayout>
                <StyledMenuBar>
                    <Link to="/">
                        <img src={logo} alt="SpaceX logo" width="200px" />
                    </Link>
                    <StyledLink to="/dragons">Dragons</StyledLink>
                    <StyledLink to="/rockets">Rockets</StyledLink>
                </StyledMenuBar>

                <Switch>
                    <Route exact path="/" children={<HomePage />} />
                    <Route exact path="/:name" children={<DisplayPage />} />
                    <Route path="/dragons/:id" children={<DragonPage />} />
                    <Route path="/rockets/:id" children={<RocketPage />} />
                </Switch>
            </StyledPageLayout>
        </Router>
    )
}

export default App
